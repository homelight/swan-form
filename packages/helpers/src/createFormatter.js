// functionally equivalent to String.repeat(int);
function repeat(str, count) {
  let out = '';
  for (let i = 0; i < count; i++) {
    out += str;
  }
  return out;
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

function getPattern(pattern, wildcard, valueRawLength) {
  const patternRawLength = pattern.match(new RegExp(wildcard, 'g')).length || 0;
  const patternFormattingChars = pattern.length - patternRawLength;
  return padStart(
    '',
    valueRawLength + (Math.ceil(valueRawLength / patternRawLength) - patternFormattingChars),
    pattern,
  )
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
  return function format(value, cursor) {
    return mask(transform(value, cursor));
  };
}
