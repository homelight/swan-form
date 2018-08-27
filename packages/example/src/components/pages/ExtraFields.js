import React, { Component } from 'react';
import { Form } from '@swan-form/form';
import { AddressField } from '@swan-form/extra-fields';
import { Field, Reset, Submit } from '@swan-form/field';
import { hot } from 'react-hot-loader';

const defaultAddress = {
  line1: '350 5th Ave',
  line2: '',
  city: 'New York',
  state: 'NY',
  zip: '10118',
};

class DynamicField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = values => {
    console.log('Setting state with values', values);
    this.setState(values);
    return values;
  };

  render() {
    return (
      <div>
        <h1>Swan Form</h1>
        <p>
          Here are some fields from the <code>@swan-form/extra-fields</code> package.
        </p>
        <Form name="extraFields" onSubmit={this.onSubmit}>
          <Field name="testfield" type="text" value="test" />
          <AddressField name="addressField" label="Address Field" defaultValue={defaultAddress} autoFocus />
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

export default hot(module)(DynamicField);
