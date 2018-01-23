import React, { Component } from 'react';
import { Field } from 'flow-form';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import css from 'react-syntax-highlighter/languages/prism/css';
import prism from 'react-syntax-highlighter/styles/prism/prism';

import './Styling.css';

registerLanguage('jsx', jsx);
registerLanguage('css', css);

const minLenTen = value => (value.length > 9 ? false : 'Min len 10');
const alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : 'Alpha Numeric');
const tenAndAlpha = [minLenTen, alphaNumeric];

export default class Styling extends Component {
  render() {
    return (
      <div>
        <h1>Styling</h1>
        <p>
          The <code>Field</code> component creates HTML that is easily manipulable with CSS to make
          the fields pretty.
        </p>
        <p>
          For instance, using the following code snippet (with the input triggering the validation
          errors),
        </p>
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
  asyncValidate
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
<label class="flowform--field flowform--field--required flowform--field-has-errors">
  <span class="flowform--field--label">A Field</span>
  <span class="flowform--field--field">
    <input type="text" value="testing_" name="minTenField" placeholder="Type Something" required="">
  </span>
  <span class="flowform--field--errors">
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
            asyncValidate
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
            asyncValidate
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
