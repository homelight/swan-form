import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import isFunction from '../../helpers/isFunction';

export default class Submit extends Component {
  constructor(props) {
    super(props);
    if (!isFunction(props.onSubmit)) {
      console.error('On Submit must be a function.');
    }
    this.submitForm = this.submitForm.bind(this);
    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);

    this.state = {
      willSubmit: false,
      isSubmitting: false,
      hasSubmitted: false,
    };
  }

  beforeSubmit() {
    // return new Promise((res, rej) => {
    //   if (isFunction(this.props.beforeSubmit)) {
    //     return this.props.beforeSubmit().then(vals => res(vals)).catch(err => rej(err));
    //   }
    //   res(true);
    // };
  }

  submitForm() {
    // We need to do something to Submit all the values here.
    // const { onSubmit } = this.props;
    // if (! isFunction(onSubmit)) {
    //   console.error('On Submit must be a function.');
    // }
    // // return new Promise((res, rej) => this.beforeSubmit.then)
    // return new Promise((res, rej) => onSubmit().then(result => res(result)).catch(err => rej(err)));
  }

  afterSubmit() {
    // const { afterSubmit } = this.props;
    // if ()
  }

  render() {
    const { name, value } = this.props;
    return <Field type="submit" name={name || 'flowform--submit'} value={value || 'Submit'} />;
  }
}
