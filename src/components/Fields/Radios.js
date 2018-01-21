/**
 * This is not firing change events correctly. Not sure if it's the wrapper or something else.
 * There are some known bugs in react-dom (https://github.com/facebook/react/issues/11097),
 * but I'm not sure if they are applicable.
 *
 * But, basically, the change event fires the first time but the native "selected" state
 * does not change, on a second click, react does nothing, but the native state
 * changes. Does react just let go of it?
 *
 * I think it's the wrapper...
 * https://react-tcjbf5.stackblitz.io
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asField from './asField';

const isChecked = { checked: true };
const notChecked = {};

class Radios extends Component {
  static displayName = 'Radios';

  static propTypes = {
    name: PropTypes.string.isRequired,
    radios: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      }),
    ).isRequired,
    value: PropTypes.string,
  };

  // constructor(props) {
  //   super(props);
  //   console.log('in constructor');
  //   this.onChange = this.onChange.bind(this);
  //   this.onFocus = this.onFocus.bind(this);
  // }

  // onFocus(event) {
  //   // console.log(event);
  // }

  // onChange(event) {
  //   event.persist();

  //   // const { value } = event.target;
  //   console.log('Changing things,', event.target.value, event.target.name);
  //   this.props.onChange(event);
  // }

  render() {
    const { radios, name, onChange, onFocus, onBlur, value } = this.props;
    console.log(name, value);
    return (
      <fieldset>
        <pre>{value}</pre>
        {radios.map(radio => {
          // right now, I'm spreading this
          return (
            <input
              type="radio"
              key={radio.value}
              value={radio.value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onFocus}
              checked={value === radio.value}
            />
          );
        })}
      </fieldset>
    );
  }
}
// export default Radios;
export default asField(Radios);
