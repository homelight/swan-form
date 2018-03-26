/**
 * Moves the cursor on fields
 *
 * Works on text based
 *
 * @todo  make this so we can change the cursor for formatters
 *
 * @param  {HTMLInputElement} el the input element on which to manipulate the cursor
 * @param {Number} position the location of the cursor (-1 means to put the cursor at the end)
 * @return {[type]}    [description]
 */
export default function moveCursor(el, position = -1) {
  /* eslint-disable no-param-reassign */
  if (typeof el.selectionStart === 'number') {
    const pos = position > -1 ? position : el.value.length;
    el.selectionStart = pos;
    el.selectionEnd = pos;
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
