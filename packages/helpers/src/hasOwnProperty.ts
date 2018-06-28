export const hasOwnProperty = (obj: object, prop: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, prop);
export default hasOwnProperty;
