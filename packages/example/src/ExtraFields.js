import React, { Component } from 'react';
import { Form } from '@flow-form/form';
import { AddressField } from '@flow-form/extra-fields';
import { Field, Reset, Submit } from '@flow-form/field';

const defaultAddress = {
  line1: '350 5th Ave',
  line2: '',
  city: 'New York',
  state: 'NY',
  zip: '10118',
};

export default class DynamicField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = values => {
    console.log('Setting state with values', values);
    this.setState(values);
  };

  render() {
    return (
      <div>
        <h1>Flow Form</h1>
        <p>
          Here are some fields from the <code>@flow-form/extra-fields</code> package.
        </p>
        <Form name="extraFields" onSubmit={this.onSubmit}>
          <Field name="testfield" type="text" value="test" />
          <AddressField
            name="addressField"
            label="Address Field"
            value={defaultAddress}
            autoFocus
          />
          <hr />
          <Submit />
          <Reset />
        </Form>
        <h3>Press Submit to see the values</h3>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
