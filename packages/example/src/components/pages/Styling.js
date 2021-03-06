/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Field } from '@swan-form/field';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

import { hot } from 'react-hot-loader';

import './Styling.css';

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');
const alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : 'Alpha Numeric');
const tenAndAlpha = [minLenTen, alphaNumeric];

class Styling extends Component {
  render() {
    return (
      <div>
        <h1>Styling</h1>
        <p>
          The <code>Field</code> component creates HTML that is easily manipulable with CSS to make the fields pretty.
        </p>
        <p>For instance, using the following code snippet (with the input triggering the validation errors),</p>
        <SyntaxHighlighter language="jsx" style={prism}>
          {`
/* Validation functions */
const minLenTen = value => (value.length > 9 ? false : 'Min len 10');
const alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : 'Alpha Numeric');
const tenAndAlpha = [minLenTen, alphaNumeric];

/* Create the field */
<Field
  type="text"
  name="minTenField"
  validate={tenAndAlpha}
  validateOnBlur
  placeholder="Type Something"
  value="testing_"
  required
  autoFocus
/>
        `.trim()}
        </SyntaxHighlighter>
        <p>will create the following HTML:</p>
        <SyntaxHighlighter language="jsx" style={prism}>
          {`
<label class="sf--field sf--field--required sf--field-has-errors">
  <span class="sf--field--label">A Field</span>
  <span class="sf--field--field">
    <input type="text" value="testing_" name="minTenField" placeholder="Type Something" required="">
  </span>
  <span class="sf--field--errors">
    <span class="flowform-field-error">Min len 10</span>
    <span class="flowform-field-error">Alpha Numeric</span>
  </span>
</label>`.trim()}
        </SyntaxHighlighter>

        <div>
          <Field
            label="A Field"
            type="text"
            name="minTenField"
            validate={tenAndAlpha}
            validateOnBlur
            placeholder="Type Something"
            value="testing_"
            required
          />
        </div>
        <div>
          <Field
            label="We could instead use the label as a hint"
            type="text"
            name="minTenField"
            className="styled-reverse"
            validate={tenAndAlpha}
            validateOnBlur
            placeholder="Type Something"
            value="testing_"
            pattern="[a-zA-Z0-9]{10,}"
            required
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(Styling);
