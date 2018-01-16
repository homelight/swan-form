import isFunction from 'lodash/isFunction';

/**
 * Moves the cursor in an editable area (input, textarea) to pos
 * @param  {[type]} el  [description]
 * @param  {Number} pos [description]
 * @return {void}
 */
function moveCursor(el, pos) {
  // See if setSelectionRange exists, if so, then use that
  if (isFunction(el.setSelectionRange)) {
    el.setSelectionRange(pos, pos);
  } else if (isFunction(el.createTextRange)) {
    const range = el.createTextRange;
    range.move('character', pos);
    range.select();
  }
}

export default function moveCursorToEnd(el) {
  if (typeof el.selectionStart == 'number') {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != 'undefined') {
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  } else {
    const tmpValue = el.value;
    el.value = '';
    el.value = tmpValue;
  }
}
