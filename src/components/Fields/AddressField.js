import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import isFunction from '../../helpers/isFunction';
import autobind from '../../helpers/autobind';

// const states = {
//   '----': '',
//   Alabama: 'AL',
//   Alaska: 'AK',
//   Arizona: 'AZ',
//   Arkansas: 'AR',
//   California: 'CA',
//   Colorado: 'CO',
//   Connecticut: 'CT',
//   Delaware: 'DE',
//   Florida: 'FL',
//   Georgia: 'GA',
//   Hawaii: 'HI',
//   Idaho: 'ID',
//   Illinois: 'IL',
//   Indiana: 'IN',
//   Iowa: 'IA',
//   Kansas: 'KS',
//   Kentucky: 'KY',
//   Louisiana: 'LA',
//   Maine: 'ME',
//   Maryland: 'MD',
//   Massachusetts: 'MA',
//   Michigan: 'MI',
//   Minnesota: 'MN',
//   Mississippi: 'MS',
//   Missouri: 'MO',
//   Montana: 'MT',
//   Nebraska: 'NE',
//   Nevada: 'NV',
//   'New Hampshire': 'NH',
//   'New Jersey': 'NJ',
//   'New Mexico': 'NM',
//   'New York': 'NY',
//   'North Carolina': 'NC',
//   'North Dakota': 'ND',
//   Ohio: 'OH',
//   Oklahoma: 'OK',
//   Oregon: 'OR',
//   Pennsylvania: 'PA',
//   'Rhode Island': 'RI',
//   'South Carolina': 'SC',
//   'South Dakota': 'SD',
//   Tennessee: 'TN',
//   Texas: 'TX',
//   Utah: 'UT',
//   Vermont: 'VT',
//   Virginia: 'VA',
//   Washington: 'WA',
//   'West Virginia': 'WV',
//   Wisconsin: 'WI',
//   Wyoming: 'WY',
// };

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

export default class AddressField extends Component {
  static contextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
  };

  static childContextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        line1: props.line1 || '',
        line2: props.line2 || '',
        city: props.city || '',
        state: props.state || '',
        zip: props.zip || '',
      },
      isTouched: false,
      isDirty: false,
      isValid: false, // update this in case the initial value is valid
    };

    autobind(this, ['register', 'unregister', 'getValue', 'setValue', 'getRef', 'setRef']);

    this.onLine1Change = this.updatePart.bind(this, 'line1');
    this.onLine2Change = this.updatePart.bind(this, 'line2');
    this.onCityChange = this.updatePart.bind(this, 'city');
    this.onStateChange = this.updatePart.bind(this, 'state');
    this.onZipChange = this.updatePart.bind(this, 'zip');
  }

  getChildContext() {
    // Overwrite the Form register/unregister functions with these ones
    return Object.assign({}, this.context, {
      register: this.register,
      unregister: this.unregister,
    });
  }

  updatePart(key, value) {
    if (
      Object.prototype.hasOwnProperty.call(this.state.value, key) &&
      this.state.value[key] !== value
    ) {
      this.setState(prevState => ({
        ...prevState,
        value: {
          ...prevState.value,
          [key]: value,
        },
      }));
    }
  }

  setValue(newValues) {
    this.setState(prevState => ({
      ...prevState,
      isDirty: true,
      isTouched: true,
      value: {
        line1: newValues.line1,
        line2: newValues.line2,
        city: newValues.city,
        state: newValues.state,
        zip: newValues.zip,
      },
    }));
  }

  validate(updateErrors = false) {}

  getRef() {
    return this.fieldRef;
  }

  setRef(el) {
    this.fieldRef = el;
  }

  register() {
    if (isFunction(this.context.register)) {
      this.context.register({
        name: this.props.name,
        validate: this.validate,
        getValue: this.getValue,
        setValue: this.setValue,
        getRef: this.getRef,
      });
    }
  }

  unregister() {
    if (isFunction(this.context.unregister)) {
      this.context.unregister(this.props.name);
    }
  }

  getValue() {
    return this.state.value;
  }

  isDirty() {
    const { value } = this.state;
    return Object.keys(value).every(key => this.props.value[key] === value[key]);
  }

  isTouched() {
    return this.state.isTouched;
  }

  render() {
    const { name, className } = this.props;
    return (
      <fieldset className={className} ref={this.setRef}>
        <legend>Address</legend>
        <Field
          type="text"
          name={`${name}-line1`}
          placeholder="Line 1"
          autoComplete="address-line1"
          onChange={this.onLine1Change}
          required
        />
        <Field
          type="text"
          name={`${name}-line2`}
          onChange={this.onLine2Change}
          autoComplete="address-line2"
          placeholder="Line 2"
        />
        <br />
        <Field
          type="text"
          name={`${name}-city`}
          autoComplete="address-level2"
          onChange={this.onCityChange}
          placeholder="City"
          required
        />
        <Field
          type="select"
          name={`${name}-state`}
          options={states}
          onChange={this.onStateChange}
          autoComplete="address-level1"
          placeholder="State"
          required
        />
        <br />
        <Field
          type="text"
          name={`${name}-zipcode`}
          autoComplete="postal-code"
          onChange={this.onZipChange}
          placeholder="Zip"
          required
        />
      </fieldset>
    );
  }
}
