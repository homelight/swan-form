import React, { Component } from 'react';
import { Field } from '@flow-form/field';
import { AsYouType } from 'libphonenumber-js';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import prism from 'react-syntax-highlighter/styles/prism/prism';

registerLanguage('jsx', jsx);

const stripNonNumeric = value => {
  let str = '';
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);

    if ((code > 47 && code < 58) || code === 43) {
      str += value[i];
    }
  }
  return str;
};

const formatPhone = value => new AsYouType('US').input(value);

const toUpperCase = value => value.toUpperCase();

export default class Formatters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedPhone: '',
    };

    this.update = this.update.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  update(value, name) {
    console.log('on update', name, this.state[name], value);
    if (Object.keys(this.state).includes(name) && this.state[name] !== value) {
      this.setState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  render() {
    return (
      <div>
        <h1>Using Formatters</h1>
        <p>Formatters can be supplied to fields, and they should be pure functions like:</p>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`const formatter = (value) => value.toUpperCase();`}
        </SyntaxHighlighter>
        <p>E.g. the following field will type in all caps.</p>
        <p>
          <Field
            type="text"
            placeholder="This field will be all caps"
            name="allCapsField"
            formatter={toUpperCase}
            size={30}
          />
        </p>

        <h2>Phone Number Formatting</h2>
        <p>
          This field is a US formatted phone number using <code>libphonenumber-js</code>.
        </p>
        <p>
          <Field
            label="US Formatted Phone:&nbsp;"
            type="text"
            name="formattedPhone"
            placeholder="(___) ___-____"
            formatter={formatPhone}
            unformatter={stripNonNumeric}
            onChange={this.update}
          />
        </p>
        <ul>
          <li>
            Value:{' '}
            <code style={{ display: 'inline-block', minWidth: '5em' }}>
              {this.state.formattedPhone || ' '}
            </code>
          </li>
          <li>
            Processed:{' '}
            <code style={{ display: 'inline-block', minWidth: '5em' }}>
              {stripNonNumeric(this.state.formattedPhone) || ' '}
            </code>
          </li>
        </ul>
        <p>The code is pretty simple:</p>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`
import { AsYouType } from 'libphonenumber-js';

const formatPhone = (value) => {
  return new AsYouType('US').input(value);
};

const stripNonNumeric = value => {
  let str = '';
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);

    if ((code > 47 && code < 58) || code === 43) {
      str += value[i];
    }
  }
  return str;
};

/* Eventually, render the component */

<Field
  name="formattedPhone"
  type="text"
  label='US Formatted Phone:'
  placeholder="(___) ___-____"
  formatter={formatPhone}
  unformatter={stripNonNumeric}
/>
          `.trim()}
        </SyntaxHighlighter>
      </div>
    );
  }
}
