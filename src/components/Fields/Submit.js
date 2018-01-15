import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import isFunction from 'lodash/isFunction';

export default class Submit extends Component {
  static contextTypes = {
    onSubmit: PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    console.log(context);
    if (!isFunction(props.onSubmit) && !isFunction(context.onSubmit)) {
      console.error(
        'On Submit must be a function passed either as a prop on the `Submit` component or on the `Form` component.',
      );
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
