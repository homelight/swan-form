import isFunction from '../../../helpers/isFunction';

/**
 * Moves the cursor in an editable area (input, textarea) to pos
 * @param  {[type]} el  [description]
 * @param  {Number} pos [description]
 * @return {void}
 */
export default function moveCursor(el, pos) {
  // See if setSelectionRange exists, if so, then use that
  if (isFunction(el.setSelectionRange)) {
    el.setSelectionRange(pos, pos);
  } else if (isFunction(el.createTextRange)) {
    const range = el.createTextRange;
    range.move('character', pos);
    range.select();
  }
}
