export default function isObject(obj) {
  return obj !== undefined && obj !== null && Object.prototype.constructor === obj.constructor;
}
