export default function isObject(object) {
  return typeof object === 'object' && Object.prototype.constructor === object.prototype.constructor;
}
