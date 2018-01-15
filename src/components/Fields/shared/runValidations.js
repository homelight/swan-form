import isFunction from '../../../helpers/isFunction';
import noErrors from './noErrors';

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

  return noErrors;
}
