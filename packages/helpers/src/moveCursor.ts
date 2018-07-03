export interface ExtendedHTMLElement extends HTMLElement {
  createTextRange?(): any;
  value?: any;
  selectionStart?: number;
  selectionEnd?: number;
  type?: string;
}

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
export default function moveCursor(el: ExtendedHTMLElement, position = -1) {
  /* eslint-disable no-param-reassign */
  const types = /text|password|search|tel|url/;
  if ('selectionStart' in el && 'type' in el && types.test(el.type)) {
    const pos = position > -1 ? position : el.value.length;
    el.selectionStart = pos;
    el.selectionEnd = pos;
  } else if ('createTextRange' in el && typeof el.createTextRange === 'function') {
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
