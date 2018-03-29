/* eslint-disable no-console, no-alert */
import React, { Component } from 'react';

import { Field, Radios, Submit, Reset } from '@flow-form/field';
import { Form } from '@flow-form/form';
import { hot } from 'react-hot-loader';

import './RegularForm.css';

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');
const alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : 'Alpha Numeric');
// const threeDigits = value => (/^[\d]{3}$/.test(value) ? false : 'Must pass three digits');

const tenAndAlpha = [minLenTen, alphaNumeric];
// const onSubmit = values => console.log(values);
const onSubmit = values =>
  new Promise(res => {
    setTimeout(() => {
      console.log(values);
      res(true);
    }, 3000);
  });

const wrapperStyle = { margin: '5rem', border: '1px solid steelblue', padding: '0 5rem 5rem' };
const fieldSetStyling = `
.remove-fieldset-styling {
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
}
.remove-fieldset-styling legend {
  margin: 0;
  padding: 0;
}`.trim();

@hot(module)
export default class RegularForm extends Component {
  constructor(props) {
    super(props);
    console.log(
      'You should see a console.error message 👇 about an invalid type. It is a test to make sure that invalid types throw an error message. The field will instead be replaced with an HTML comment.',
    );
  }
  render() {
    return (
      <div>
        <div style={wrapperStyle}>
          <h1>Form Component</h1>
          <Form onSubmit={onSubmit} name="testform">
            <div>
              <p>A regular text field with a few validations and autofocus.</p>

              <Field
                type="text"
                name="minTenField"
                validate={tenAndAlpha}
                label="This is a label"
                asyncValidate
                validateWhileTyping
                placeholder="test"
                value="testing12345"
                required
                autoFocus
              />
            </div>

            <div>
              <Field type="checkbox" label="Checkbox field" name="checkboxaaa" value />
            </div>

            <div>
              <p>You can style inputs with CSS.</p>

              <Field
                type="text"
                label="A Fancy Field"
                name="styledFancy"
                pattern="[\d]{3}"
                required
                placeholder="Type '323' in this box"
                className="fancy-field"
                value="Type '323' in this box"
              />
            </div>

            <div>
              <p>
                {' '}
                This uses the <code>Radios</code> component. Radio buttons are different than the
                rest of the standard form fields because they are, inherently, a set. Since they all
                share a sort of &quot;state value&quot; (as opposed to the value attribute), the
                value of the group is set to the currently selected radio button&apos;s value, so
                they get a different approach. The buttons are rendered in a <code>fieldset</code>{' '}
                wrapper, and the overall label is set as a <code>legend</code> tag.
              </p>
              <Radios
                name="radioset"
                label="Radio Set"
                options={[{ label: 'first', value: 'first' }, { label: 'second', value: 'second' }]}
                value="second"
              />
            </div>

            <div>
              <p>If you do not want the native fieldset styling, then you can remove it</p>
              <Radios
                name="radioset2"
                className="remove-fieldset-styling"
                label="Radio Set"
                options={[{ label: 'first', value: 'first' }, { label: 'second', value: 'second' }]}
                value="second"
              />
              <pre>{fieldSetStyling}</pre>
            </div>

            <div>
              {/* eslint-disable no-useless-escape */}
              <p>
                This text field must be three digits because it uses the native pattern attribute
                for validation that browsers implement. So <code>{'pattern="[d]{3}"'}</code> gets
                sent to the <code>input</code> field.
              </p>
              {/* eslint-disable no-useless-escape */}
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
            </div>

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

            <Field name="range" type="range" min={0} max={200} step={5} label="Range" />
            <Field name="checkbox" type="checkbox" checked />
            <Field name="invalid" type="invalid" />

            <Field name="tel" type="tel" label="tel" />

            <Field name="time" type="time" label="time" />
            <div>
              <Field
                name="url"
                type="url"
                label="url"
                placeholder="https://www.example.com"
                size={30}
              />
              <pre>
                {
                  '<Field name="url" type="url" label="url" placeholder="https://www.example.com" size={30} />'
                }
              </pre>
            </div>

            <Field name="week" type="week" label="week" />
            <br />
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
