function filterAndJoin(arr) {
  return arr.filter(x => x).join(' ');
}

export default function classes(classNames) {
  if (Array.isArray(classNames)) {
    return filterAndJoin(classNames);
  }
  if (classNames != null && typeof classNames === 'object') {
    return filterAndJoin(
      Object.keys(classNames).map(name => !!classNames[name] && classNames[name]),
    );
  }
  if (typeof classNames === 'string') {
    return classNames;
  }
  return '';
}
