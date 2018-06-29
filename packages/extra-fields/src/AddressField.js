import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asField, Field } from '@swan-form/field';

const states = [
  '----',
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

class AddressField extends Component {
  static displayName = 'ComposedAddressField';

  static propTypes = {
    autoFocus: PropTypes.bool,
    value: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string, // eslint-disable-line
    className: PropTypes.string,
  };

  static defaultProps = {
    autoFocus: false,
    value: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    className: '',
  };

  updatePart = (partValue, name) => {
    const fieldName = name.replace(`${this.props.name}-`, ''); // eslint-disable-line
    const { value, onChange } = this.props;
    if (Object.keys(value).includes(fieldName) && value[fieldName] !== partValue) {
      onChange({
        ...value,
        [fieldName]: partValue,
      });
    }
  };

  render() {
    const { autoFocus, label, name, className, value } = this.props;
    return (
      <fieldset className={className}>
        {label && <legend>{label}</legend>}
        <Field
          type="text"
          name={`${name}-line1`}
          placeholder="Line 1"
          autoComplete="address-line1"
          onChange={this.updatePart}
          value={value.line1}
          required
          autoFocus={autoFocus}
        />
        <Field
          type="text"
          name={`${name}-line2`}
          onChange={this.updatePart}
          autoComplete="address-line2"
          placeholder="Line 2"
          value={value.line2}
        />
        <br />
        <Field
          type="text"
          name={`${name}-city`}
          autoComplete="address-level2"
          onChange={this.updatePart}
          placeholder="City"
          value={value.city}
          required
        />
        <Field
          type="select"
          name={`${name}-state`}
          options={states}
          onChange={this.updatePart}
          autoComplete="address-level1"
          value={value.state}
          required
        />
        <br />
        <Field
          type="text"
          name={`${name}-zip`}
          autoComplete="postal-code"
          onChange={this.updatePart}
          placeholder="Zip"
          value={value.zip}
          validate={v => (!v.trim() ? 'This field is required' : false)}
        />
      </fieldset>
    );
  }
}

export default asField(AddressField, { registerWrapped: false });
