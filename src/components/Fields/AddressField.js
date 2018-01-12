import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

export default class AddressField extends Component {
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

    this.onLine1Change = this.updatePart.bind(this, 'line1');
    this.onLine2Change = this.updatePart.bind(this, 'line2');
    this.onCityChange = this.updatePart.bind(this, 'city');
    this.onStateChange = this.updatePart.bind(this, 'state');
    this.onZipChange = this.updatePart.bind(this, 'zip');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  updatePart(key, value) {
    if (
      Object.prototype.hasOwnProperty.call(this.state.value, key) &&
      this.state.value[key] !== value
    ) {
      console.log('updating address for', key, value);
      this.setState(prevState => ({
        ...prevState,
        value: {
          ...prevState.value,
          [key]: value,
        },
      }));
    }
  }

  validate() {}

  register() {
    const { name, register } = this.props;
    if (isFunction(register)) {
      register({
        name,
        validate: this.validate,
        getValue: this.getValue,
        getRef: this.getRef,
      });
    }
  }

  unregister() {
    const { name } = this.props;
    if (isFunction(unregister)) {
      unregister({ name });
    }
  }

  getValue() {
    return this.state.value;
  }

  isDirty() {
    return Object.keys(this.state.value).every(
      key => this.props.value[key] === this.state.value[key],
    );
  }

  isTouched() {
    return this.state.isTouched;
  }

  render() {
    const { name, className } = this.props;
    return (
      <fieldset className={className}>
        <Field
          type="text"
          name={`${name}-line1`}
          placeholder="Line 1"
          onChange={this.onLine1Change}
          required
        />
        <Field
          type="text"
          name={`${name}-line2`}
          onChange={this.onLine2Change}
          placeholder="Line 2"
        />
        <Field type="text" name={`${name}-city`} onChange={this.onCityChange} placeholder="City" />
        <Field
          type="text"
          name={`${name}-state`}
          onChange={this.onStateChange}
          placeholder="State"
        />
        <Field type="text" name={`${name}-zipcode`} onChange={this.onZipChange} placeholder="Zip" />
      </fieldset>
    );
  }
}
