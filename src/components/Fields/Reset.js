import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    // We need to do something to reset all the values here.
  }

  render() {
    const { name, value } = this.props;
    return <Field type="reset" name={name || 'flowform--reset'} value={value || 'Reset'} />;
  }
}
