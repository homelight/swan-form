/* eslint-disable react/prefer-stateless-function, jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '@flow-form/helpers/dist/classes';
import asField from './asField';

class Radios extends Component {
  static displayName = 'Radios';

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string, // eslint-disable-line
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      }),
    ).isRequired,
    value: PropTypes.string, // eslint-disable-line
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    required: PropTypes.bool, // eslint-disable-line
    errors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
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

    return (
      <fieldset
        className={classes([
          'ff--radios',
          'ff--fieldset',
          required && 'ff--field--required',
          className,
        ])}
      >
        {label && <legend>{label}</legend>}
        {options.map(option => (
          // right now, I'm spreading this
          <label
            className={classes([
              'ff--radio--field',
              value === option.value && 'ff--radio--checked',
            ])}
            key={option.value}
          >
            <span>{option.label}</span>
            <input
              type="radio"
              name={name}
              value={option.value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              checked={value === option.value}
            />
          </label>
        ))}
        <span className="ff--field--errors">
          {errors.filter(err => err).map(err => (
            <span key={err} className="ff--field--error">
              {err}
            </span>
          ))}
        </span>
      </fieldset>
    );
  }
}

export default asField(Radios);
