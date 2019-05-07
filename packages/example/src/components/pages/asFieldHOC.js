/* eslint-disable react/no-multi-comp, react/prefer-stateless-function, react/prop-types */

import React, { Component } from 'react';

import { asField, Submit } from '@swan-form/field';
import { Form } from '@swan-form/form';
import { hot } from 'react-hot-loader';

/* eslint-disable no-console */
const onSubmit = values => {
  console.log(values);
  return Promise.resolve(values);
};
/* eslint-enable no-console */

const toWrap = ({ name, onChange, value, placeholder, setRef }) => (
  <input name={name} onChange={onChange} ref={setRef} value={value} placeholder={placeholder} />
);

class toWrapClass extends Component {
  render() {
    const { isValid, setRef, getValue, setValue, isFormSubmitting, hasFormSubmitted, ...spreadProps } = this.props;
    return <input ref={setRef} {...spreadProps} />;
  }
}

const Wrapped = asField(toWrap);
const WrappedClass = asField(toWrapClass);

class asFieldHOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aWrappedFormInput: '',
      aWrappedFormInput2: '',
    };
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState(prevState => Object.assign({}, prevState, { [name]: value }));
  };

  render() {
    return (
      <Form name="test" onSubmit={onSubmit}>
        <p>
          Stateless Input Component Wrapped with HOC:{' '}
          <Wrapped name="aWrappedFormInput" onChange={this.onChange} placeholder="test" />
        </p>
        <p>
          ES6 Class Based Input Component Wrapped with HOC:{' '}
          <WrappedClass name="aWrappedFormInput2" onChange={this.onChange} placeholder="test" />
        </p>
        <h4>Values</h4>
        {Object.keys(this.state).map(key => (
          <pre key={key}>{`${key}: ${this.state[key]}`}</pre>
        ))}
        <p>
          <Submit />
        </p>
      </Form>
    );
  }
}

export default hot(module)(asFieldHOC);
