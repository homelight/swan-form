// functionally equivalent to String.repeat(int);
function repeat(str, count) {
  const out = new Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = str;
  }
  return out.join('');
}

// functionally equivalent to String.padStart(length, str);
function padStart(str, targetLength, padStr) {
  if (str.length > targetLength) {
    return str;
  }
  const targetLen = targetLength - str.length;
  if (targetLen > padStr.length) {
    // eslint-disable-next-line
    padStr += repeat(padStr, targetLen / padStr.length);
  }
  return padStr.slice(0, targetLen) + str;
}

function createTransformer(transformer) {
  return function transform(value, cursor) {
    const leftValue = value.slice(0, cursor);
    const leftTransform = transformer(leftValue);
    const delta = leftTransform.length - leftValue.length;
    return {
      value: transformer(value),
      cursor: cursor + delta,
    };
  };
}

function getPattern(pattern, wildcard, valueRawLen) {
  const patternRawLen = pattern.match(new RegExp(wildcard, 'g')).length || 0;
  const pFormattingChars = pattern.length - patternRawLen;
  const targetLength = valueRawLen + (Math.ceil(valueRawLen / patternRawLen) - pFormattingChars);
  return padStart('', targetLength, pattern)
    .split('')
    .reverse()
    .join('');
}

function createMask(pattern, wildcard, unbound) {
  return function mask({ value, cursor }) {
    // Unmasked value
    const v = value.split('');
    // The mask i.e. (___) ___, or, if unbound, the mask partial
    const p = unbound ? getPattern(pattern, wildcard, value.length).split('') : pattern.split('');
    let delta = 0;
    let pi = 0;
    for (let vi = 0, plen = p.length, vlen = v.length; pi < plen && vi < vlen; pi++) {
      if (p[pi] === wildcard) {
        vi += 1;
        p[pi] = v[vi];
      } else if (vi < cursor) {
        delta += 1;
      }
    }
    return [p.slice(0, pi).join(''), cursor + delta];
  };
}

export default function createFormatter(transformer, pattern, unbound = false, wildcard = '_') {
  const transform = createTransformer(transformer);
  const mask = createMask(pattern, wildcard, unbound);
  return (value, cursor) => mask(transform(value, cursor));
}
