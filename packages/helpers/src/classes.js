import isObject from 'lodash/isObject';

export default function classes(obj) {
  if (Array.isArray(obj)) {
    return obj.filter(Boolean).join(' ');
  }
  if (isObject(obj)) {
    return Object.keys(obj)
      .map(k => !!obj[k] && k)
      .filter(Boolean)
      .join(' ');
  }
  if (typeof obj === 'string') {
    return obj;
  }
  return '';
}
