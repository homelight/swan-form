import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse, format, AsYouType } from 'libphonenumber-js';

import { Field } from '@flow-form/field';

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

const formatter = value => {
  return stripNonNumeric(value);
};

const unformatter = value => {
  return stripNonNumeric(value);
};

export default class FormattedPhone extends Component {
  constructor(props) {
    super(props);
    this.formatter = new AsYouType('US');
    this.format = this.format.bind(this);
  }

  format(value) {
    return format(value, 'US', 'International');
    // return new AsYouType('US').input(stripNonNumeric(value));
  }

  render() {
    return (
      <Field type="text" name="formattedPhone" formatter={this.format} unformatter={unformatter} />
    );
  }
}
