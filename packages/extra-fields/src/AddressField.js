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
  };

  static displayName = 'ComposedAddressField';

  updatePart = (partValue, name) => {
    const fieldName = name.replace(`${this.props.name}-`, '');
    const { value, onChange } = this.props;
    if (Object.keys(value).includes(fieldName) && value[fieldName] !== partValue) {
      onChange({
        ...value,
        [fieldName]: partValue,
      });
    }
  };

  render() {
    const { autoFocus, label, name, className } = this.props;
    return (
      <fieldset className={className}>
        {label && <legend>{label}</legend>}
        <Field
          type="text"
          name={`${name}-line1`}
          placeholder="Line 1"
          autoComplete="address-line1"
          onChange={this.updatePart}
          value={this.props.value.line1}
          required
          autoFocus={autoFocus}
        />
        <Field
          type="text"
          name={`${name}-line2`}
          onChange={this.updatePart}
          autoComplete="address-line2"
          placeholder="Line 2"
          value={this.props.value.line2}
        />
        <br />
        <Field
          type="text"
          name={`${name}-city`}
          autoComplete="address-level2"
          onChange={this.updatePart}
          placeholder="City"
          value={this.props.value.city}
          required
        />
        <Field
          type="select"
          name={`${name}-state`}
          options={states}
          onChange={this.updatePart}
          autoComplete="address-level1"
          value={this.props.value.state}
          required
        />
        <br />
        <Field
          type="text"
          name={`${name}-zip`}
          autoComplete="postal-code"
          onChange={this.updatePart}
          placeholder="Zip"
          value={this.props.value.zip}
          validate={value => (!value.trim() ? 'This field is required' : false)}
        />
      </fieldset>
    );
  }
}

export default asField(AddressField, { registerWrapped: false });
