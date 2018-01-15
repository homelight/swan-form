import React, { Component } from 'react';

import { AddressField, DateField, Field, Form, Submit, Reset } from './flow-form';

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');
const alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : 'Alpha Numeric');
const threeDigits = value => (/^[\d]{3}$/.test(value) ? false : 'Must pass three digits');

const tenAndAlpha = [minLenTen, alphaNumeric];
const onSubmit = values => console.log(values);
export default class RegularForm extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: '5rem', border: '1px solid steelblue', padding: '5rem' }}>
          <Form onSubmit={onSubmit} name="testform">
            <Field
              type="text"
              name="minTenField"
              validate={tenAndAlpha}
              asyncValidate
              required={true}
              validateWhileTyping
              placeholder="test"
              value="testing"
              autoFocus
            />

            <Field
              type="text"
              name="withPattern"
              validate={threeDigits}
              asyncValidate
              placeholder="test2"
              label="field with pattern"
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

            <Submit />
            <span>&nbsp;</span>
            <Reset />
          </Form>
        </div>
      </div>
    );
  }
}
