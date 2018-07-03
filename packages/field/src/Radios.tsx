/* eslint-disable react/prefer-stateless-function, jsx-a11y/label-has-for */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import asField from './asField';

import { FieldProps } from '../common.d';

class Radios extends React.Component<FieldProps> {
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
    const { errors, className, required, label, options, name, onChange, onFocus, onBlur, value } = this.props;

    return (
      <fieldset
        className={classes([
          'sf--fieldset',
          'sf--radios',
          required && 'sf--required',
          errors.length !== 0 && 'sf--has-errors',
          className,
        ])}
      >
        {label && <legend>{label}</legend>}
        {options.map((option: { label: string; value: string }) => (
          // right now, I'm spreading this
          <label
            className={classes(['sf--field', 'sf--type-radio', value === option.value && 'sf--checked'])}
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
        <span className="sf--errors">
          {errors.map((err: string) => (
            <span key={err} className="sf--error">
              {err}
            </span>
          ))}
        </span>
      </fieldset>
    );
  }
}

export default asField(Radios);
