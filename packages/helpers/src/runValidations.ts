import isFunction from 'lodash/isFunction';
import emptyArray from './emptyArray';

export default function runValidations(validate, value) {
  if (Array.isArray(validate)) {
    return validate.map(fn => {
      if (!isFunction(fn)) {
        return false;
      }
      return fn(value);
    });
  }

  if (isFunction(validate)) {
    const errors = validate(value);
    if (Array.isArray(errors)) {
      return errors;
    }
    return [errors];
  }

  return emptyArray;
}
