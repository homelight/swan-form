export default (value, min = -Infinity, max = Infinity) => Math.max(Math.min(value, max), min);
