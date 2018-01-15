import React, { Component } from 'react';

import { AddressField, DateField, Field } from './flow-form';

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: '5rem', border: '1px solid steelblue', padding: '5rem' }}>
        <form>
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

          <DateField name="date" placeholder="MM/YYYY" />

          <br />
          <br />

          <AddressField name="address1" />

          <br />

          <Field
            type="textarea"
            name="freeform"
            label="Please Explain"
            rows={5}
            cols={40}
            required
          />

          <Field
            name="selectField"
            type="select"
            options={[
              'one',
              'two',
              'three',
              { label: 'four', value: 'four' },
              { OptGroup: ['abc', 'def', 'hij'] },
            ]}
          />

          <br />
          <br />
          <hr />
          <br />

          <Field name="submit" type="submit" value="Submit" />
          <span>&nbsp;</span>
          <Field name="reset" type="reset" value="Reset" />
        </form>
      </div>
    );
  }
}
