import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '@flow-form/helpers/classes';
import asField from './asField';

class Radios extends Component {
  static displayName = 'Radios';

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      }),
    ).isRequired,
    value: PropTypes.string,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    required: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.string, false])),
  };

  static defaultProps = {
    errors: [],
  };

  render() {
    const {
      errors,
      className,
      required,
      label,
      options,
      name,
      onChange,
      onFocus,
      onBlur,
      value,
    } = this.props;
    const fieldStyle = classes(['flowform--field--field', required && 'flowform--field--required']);
    return (
      <fieldset className={classes(['flowform--radios', className])}>
        {label && <legend>{label}</legend>}
        {options.map(option => {
          // right now, I'm spreading this
          return (
            <label className={fieldStyle} key={option.value}>
              <span>{option.label}</span>
              <input
                type="radio"
                value={option.value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onFocus}
                checked={value === option.value}
              />
            </label>
          );
        })}
        <span className="flowform--field--errors">{errors.filter(err => err).join(',')}</span>
      </fieldset>
    );
  }
}

export default asField(Radios);
