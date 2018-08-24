import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
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

export interface AddressProps {
  name: string;
  value: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    [key: string]: any;
  };
  className?: string;
  onChange?(event: React.ChangeEvent<any>): void;
  autoFocus?: boolean;
  label?: React.ReactNode;
  setValue?(value: any): void;
}

class AddressField extends Component<AddressProps, any> {
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

  updatePart = (event: React.ChangeEvent<any>) => {
    const { target } = event;
    const { name, value, setValue } = this.props;
    const fieldName = target.name.replace(`${name}-`, ''); // eslint-disable-line

    if (Object.keys(value).includes(fieldName) && value[fieldName] !== target.value) {
      setValue!({
        ...value,
        [fieldName]: target.value,
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
          register={false}
          required
          autoFocus={autoFocus}
        />
        <Field
          type="text"
          name={`${name}-line2`}
          onChange={this.updatePart}
          autoComplete="address-line2"
          placeholder="Line 2"
          register={false}
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
          register={false}
          required
        />
        <Field
          type="select"
          name={`${name}-state`}
          options={states}
          onChange={this.updatePart}
          autoComplete="address-level1"
          value={value.state}
          register={false}
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
          register={false}
          validate={(v: string) => (!v.trim() ? 'This field is required' : false)}
        />
      </fieldset>
    );
  }
}

export default asField(AddressField);
