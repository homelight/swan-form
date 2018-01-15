// @TODO consider replacing with the lodash function
export default function isObject(obj) {
  return obj !== undefined && obj !== null && Object.prototype.constructor === obj.constructor;
}
