import React, { Component } from 'react';

import { AddressField, DateField, Field } from './flow-form';

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: '5rem', border: '1px solid steelblue', padding: '5rem' }}>
        <Field
          type="text"
          name="minTenField"
          validate={minLenTen}
          asyncValidate
          required={true}
          validateWhileTyping
          placeholder="test"
          value="testing"
          label="field"
          autoFocus
        />

        <AddressField name="address1" />

        <Field
          type="textarea"
          name="freeform"
          label="Please Explain"
          rows={5}
          cols={40}
        />
      </div>
    );
  }
}
