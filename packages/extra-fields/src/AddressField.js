import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asField, Field } from '@flow-form/field';
import isFunction from 'lodash/isFunction';
import { autobind } from '@flow-form/helpers';

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

  static contextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
  };

  static childContextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isTouched: false,
      isDirty: false,
      isValid: false, // update this in case the initial value is valid
    };
    this.initialState = { ...this.state };

    this.fieldRefs = {};

    autobind(this, ['register', 'reset', 'unregister', 'getValue', 'setValue', 'getRef', 'setRef']);

    this.onLine1Change = this.updatePart.bind(this, 'line1');
    this.onLine2Change = this.updatePart.bind(this, 'line2');
    this.onCityChange = this.updatePart.bind(this, 'city');
    this.onStateChange = this.updatePart.bind(this, 'state');
    this.onZipChange = this.updatePart.bind(this, 'zip');
  }

  getChildContext() {
    // Overwrite the Form register/unregister functions with these ones
    return Object.assign({}, this.context, {
      registerField: this.register,
      unregisterField: this.unregister,
    });
  }

  componentDidMount() {
    if (isFunction(this.context.register)) {
      console.log('registering things', this.props.name, this.reset);
      this.context.register({
        // This should be a unique key
        name: this.props.name,
        // In case we need to grab the ref @TODO maybe remove
        getRef: this.getRef,
        // Gets the value from the field
        getValue: this.getValue,
        // setValue can be useful for overwriting a value
        setValue: this.setValue,
        // The form must call all the validation functions synchronously
        validate: this.validate,
        // Runs the validation functions to see if the field is valid
        isValid: this.isValid,
        // Resets the field
        reset: this.reset,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(...nextState);
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

  getRef() {
    return this.fieldRef;
  }

  getValue() {
    return this.state.value;
  }

  setRef(el) {
    this.fieldRef = el;
  }

  reset() {
    console.log('address field reset');
    this.setState(this.initialState);
  }

  register({ name, getRef, reset }) {
    this.fieldRefs = {
      ...this.fieldRefs,
      [name]: {
        getRef: getRef(),
        reset,
      },
    };
    if (isFunction(this.context.register)) {
      this.context.register({
        name: this.props.name,
        validate: this.validate,
        getValue: this.getValue,
        setValue: this.setValue,
        getRef: this.getRef,
        reset: this.reset,
      });
    }
  }

  unregister() {
    if (isFunction(this.context.unregister)) {
      this.context.unregister(this.props.name);
    }
  }

  validate() {
    return true;
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

  render() {
    const { autoFocus, label, name, className } = this.props;
    return (
      <fieldset className={className} ref={this.setRef}>
        {label && <legend>{label}</legend>}
        <Field
          type="text"
          name={`${name}-line1`}
          placeholder="Line 1"
          autoComplete="address-line1"
          onChange={this.onLine1Change}
          value={this.state.value.line1}
          required
          autoFocus={autoFocus}
        />
        <Field
          type="text"
          name={`${name}-line2`}
          onChange={this.onLine2Change}
          autoComplete="address-line2"
          placeholder="Line 2"
          value={this.state.value.line2}
        />
        <br />
        <Field
          type="text"
          name={`${name}-city`}
          autoComplete="address-level2"
          onChange={this.onCityChange}
          placeholder="City"
          value={this.state.value.city}
          required
        />
        <Field
          type="select"
          name={`${name}-state`}
          options={states}
          onChange={this.onStateChange}
          autoComplete="address-level1"
          value={this.state.value.state}
          required
        />
        <br />
        <Field
          type="text"
          name={`${name}-zipcode`}
          autoComplete="postal-code"
          onChange={this.onZipChange}
          placeholder="Zip"
          value={this.state.value.zip}
          required
        />
      </fieldset>
    );
  }
}

export default asField(AddressField, { registerWrapped: false });
