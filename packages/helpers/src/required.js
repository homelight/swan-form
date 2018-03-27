export function createRequired(message) {
  return function required(value) {
    switch (typeof value) {
      case 'number':
        return !value && value !== 0 ? message : false;
      case 'string':
        return !value.trim() ? message : false;
      default:
        return message;
    }
  };
}

export const required = createRequired('Required');
export default required;
