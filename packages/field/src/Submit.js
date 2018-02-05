import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { classes } from '@flow-form/helpers';
import Field from './Field';

export default class Submit extends Component {
  static contextTypes = {
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.func,
  };

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    name: 'ff--submit',
    className: '',
    value: 'Submit',
  };

  constructor(props, context) {
    super(props);
    if (!isFunction(props.onSubmit) && !isFunction(context.onSubmit)) {
      /* eslint-disable no-console */
      console.error(
        'On Submit must be a function passed either as a prop on the `Submit` component or on the `Form` component.',
      );
      /* eslint-ene no-console */
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
    console.log('submit form');
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
    const { className, name, value } = this.props;
    return (
      <Field
        className={classes(['ff--submit', className])}
        type="submit"
        disabled={this.context.isSubmitting()}
        name={name}
        value={value}
        onSubmit={this.submitForm}
      />
    );
  }
}
