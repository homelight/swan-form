import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

export default class DateField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Field type="text" />;
  }
}
