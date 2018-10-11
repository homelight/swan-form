/**
 * Creates simple validation functions
 */
export function createRequired(message: string) {
  return function required(value: any): string | false {
    switch (typeof value) {
      case 'number':
        return !value && value !== 0 ? message : false;
      case 'string':
        return !value.trim() ? message : false;
      case 'boolean':
        return value ? false : message;
      default:
        return message;
    }
  };
}

/**
 * Standard "required" validation function with error message "Required"
 */
export const required = createRequired('Required');

/**
 * Standard "required" validation function with error message "Required"
 */
export default required;
