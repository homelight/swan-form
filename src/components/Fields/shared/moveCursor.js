/**
 * Moves the cursor on fields
 *
 * Works on text based
 *
 *
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
export default function moveCursorToEnd(el) {
  /* eslint-disable no-param-reassign */
  if (typeof el.selectionStart === 'number') {
    el.selectionStart = el.value.length;
    el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange !== 'undefined') {
    const range = el.createTextRange();
    range.collapse(false);
    range.select();
  } else {
    // Hack fix for <input type="number" />
    const tmpValue = el.value;
    el.value = '';
    el.value = tmpValue;
  }
  /* eslint-enable no-param-reassign */
}
