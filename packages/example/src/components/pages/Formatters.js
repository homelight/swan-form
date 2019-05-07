import React, { Component } from 'react';
import { Field } from '@swan-form/field';
import { createFormatter } from '@swan-form/helpers';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import { hot } from 'react-hot-loader';

const stripNonNumeric = value => {
  let str = '';
  if (typeof value === 'undefined') {
    return '';
  }
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);

    if ((code > 47 && code < 58) || code === 43) {
      str += value[i];
    }
  }
  return str;
};

const numbersOnly = value => value.replace(/[^0-9]{1,}/g, '');
const toUpperCase = value => value.replace(/[_-]{1,}/g, '').toUpperCase();

const upCase = createFormatter(toUpperCase, '___-', true);
const formatPhone = createFormatter(numbersOnly, '(___) ___-____');
const fmtMoney = createFormatter(numbersOnly, '___,', true);
const moneyFormatter = (val, cur) => {
  const [value, cursor] = fmtMoney(val, cur);
  // Since we're prefixing the value, we have to increment the cursor.
  return [`$${value}`, cursor + 1];
};

class Formatters extends Component {
  state = {
    formattedPhone: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  update = (value, name) => {
    if (Object.keys(this.state).includes(name) && this.state[name] !== value) {
      this.setState(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

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
            format={upCase}
            unformat={x => x}
            size={30}
          />
        </p>

        <h2>Phone Number Formatting</h2>
        <p>
          <Field
            label="US Formatted Phone:&nbsp;"
            type="text"
            name="formattedPhone"
            placeholder="(___) ___-____"
            format={formatPhone}
            unformat={stripNonNumeric}
            onChange={this.update}
          />
        </p>
        <ul>
          <li>
            Value: <code style={{ display: 'inline-block', minWidth: '5em' }}>{this.state.formattedPhone || ' '}</code>
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
import Field from '@swan-form/field';
import { createFormatter } from '@swan-form/helpers';

const numbersOnly = value => value.replace(/[^0-9]{1,}/g, '');
const formatPhone = createFormatter(numbersOnly, '(___) ___-____');

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
        <Field label="Formatted Currency: " format={moneyFormatter} type="text" name="formattedCurrency" />
      </div>
    );
  }
}

export default hot(module)(Formatters);
