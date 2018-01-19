import React, { Component } from 'react';

import { AddressField, DateField, Radios, Field, Form, Submit, Reset } from './flow-form';

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');
const alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : 'Alpha Numeric');
const threeDigits = value => (/^[\d]{3}$/.test(value) ? false : 'Must pass three digits');

const tenAndAlpha = [minLenTen, alphaNumeric];
// const onSubmit = values => console.log(values);
const onSubmit = values =>
  new Promise(res => {
    setTimeout(() => {
      console.log(values);
      res(true);
    }, 3000);
  });
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
              validateWhileTyping
              placeholder="test"
              value="testing12345"
              autoFocus
            />

            <Radios
              name="radioset"
              radios={[
                { label: 'first', value: 'first' },
                { label: 'second', value: 'second', checked: true },
              ]}
              value="second"
            />

            <Field
              type="text"
              name="withPattern"
              // validate={threeDigits}
              pattern="[\d]{3}"
              asyncValidate
              placeholder="test2"
              value={323}
              label="field with pattern"
            />

            <Field type="number" label="Number Field" name="number-field" value="4" />

            <Field name="date" type="date" placeholder="MM/YYYY" />

            <Field name="button" type="button" onClick={() => alert('Hi')} value="What?" />
            <div>
              <Field name="color" type="color" label="Native Color Picker: " />
            </div>

            <Field name="datetime-local" type="datetime-local" />
            <Field name="email" type="email" />
            <Field name="file" type="file" accept="dmg" />

            <Field name="month" type="month" value="2018-01" label="month" />
            <Field name="notapassword" type="password" />
            <fieldset>
              <legend>Radios are not working</legend>
              <Field name="radio" type="radio" value="a" />
              <Field name="radio" type="radio" value="b" checked />
            </fieldset>
            <Field name="range" type="range" min={0} max={200} step={5} label="Range" />
            <Field name="checkbox" type="checkbox" checked />
            <Field name="invalid" type="invalid" />

            <Field name="tel" type="tel" label="tel" />

            <Field name="time" type="time" label="time" />
            <Field name="url" type="url" label="url" />
            <Field name="week" type="week" label="week" />
            <br />
            <br />

            {/* <AddressField name="address1" /> */}

            <br />

            <Field
              type="textarea"
              name="freeform"
              label="Please Explain"
              value="test"
              rows={5}
              cols={40}
              required
            />

            <Field
              name="selectField"
              type="select"
              multiple
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
