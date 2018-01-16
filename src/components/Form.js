import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import hasOwnProperty from '../helpers/hasOwnProperty';
import autobind from '../helpers/autobind';

// These are fields that we will automatically pull out of the form as they are just the
// automatically generated names for the submit and reset buttons
const fieldToRemove = ['flowform--reset', 'flowform--submit'];

export default class Form extends Component {
  static propTypes = {
    /**
     * The name of the form
     */
    name: PropTypes.string.isRequired,
    /**
     * The function to run on submit
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * A preprocessor run on form values after validation but before submit
     */
    beforeSubmit: PropTypes.func,
    /**
     * A function run after a successful submit
     */
    afterSubmit: PropTypes.func,
    /**
     * Turn on or off autocomplete for forms (does not always work)
     */
    autoComplete: PropTypes.oneOf(['on', 'off']),
    /**
     * Turn off native form validation
     */
    noValidate: PropTypes.bool,
  };

  static defaultProps = {
    autoComplete: 'on',
    noValidate: false,
  };

  static childContextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    reset: PropTypes.func,
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.func,
  };

  constructor(props) {
    super(props);

    ['acceptCharset', 'action', 'target'].forEach(prop => {
      if (props[prop]) {
        console.error(
          `FlowForm Error: Do not provide a '${prop}' prop for a form. Instead, handle form submission with an onSubmit handler to submit and do any necessary transforms there.`,
        );
      }
    });

    // Fill out with all the things
    this.state = {
      isSubmitting: false,
      hasSubmitted: false,
      hasSubmitError: false,
      submitError: [],
    };

    // This isn't a pure component by any means. We're going to create an object to keep track
    // of all of the fields that get registered with this component.
    this.fields = {};

    autobind(this, [
      'setRef',
      'handleBeforeSubmit',
      'handleOnSubmit',
      'handleAfterSubmit',
      'registerField',
      'unregsiterField',
      'resetForm',
    ]);

    this.isSubmitting = this.getValue.bind(this, 'isSubmitting');
  }

  setRef(el) {
    this.form = el;
  }

  getChildContext() {
    return {
      register: this.registerField,
      unregister: this.unregsiterField,
      autoComplete: this.props.autoComplete,
      reset: this.resetForm,
      onSubmit: this.handleOnSubmit,
      isSubmitting: this.isSubmitting,
    };
  }

  getValue(key) {
    if (hasOwnProperty(this.state, key)) {
      return this.state[key];
    }
    return null;
  }

  getSpreadProps() {
    return ['noValidate'].reduce((acc, prop) => {
      if (hasOwnProperty(this.props, prop)) {
        acc[prop] = this.props[prop];
      }
      return acc;
    }, {});
  }

  handleBeforeSubmit() {
    this.setState(prevState => ({
      ...prevState,
      isSubmitting: true,
    }));

    return new Promise((res, rej) => {
      const isValid = Object.keys(this.fields).every(field => this.fields[field].validate());
      if (!isValid) {
        console.log('Form is invalid. Field level errors should ensue.');
      }
      const values = Object.keys(this.fields)
        .filter(field => !fieldToRemove.includes(field))
        .reduce(
          (acc, field) => ({
            ...acc,
            [field]: this.fields[field].getValue(),
          }),
          {},
        );

      if (isFunction(this.props.beforeSubmit)) {
        // check if this is a promise
        return res(this.props.beforeSubmit(values));
      }

      return res(values);
    });
  }

  handleAfterSubmit(values) {
    if (isFunction(this.props.afterSubmit)) {
      // check if this is a promise
      return this.props.afterSubmit(values);
    }
    return Promise.resolve(values);
  }

  handleSubmit(values) {
    const result = this.props.onSubmit(values);
    return isPromise(result) ? result : Promise.resolve(result);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.handleBeforeSubmit()
      .then(values => this.handleSubmit)
      .then(result => this.handleAfterSubmit);

    // this.props.onSubmit(values);
    // console.log(values);
    // this.handleBeforeSubmit(values)
    //   .then(this.props.onSubmit)
    //   .then(this.handleAfterSubmit);
    // console.log('Submitting...');
  }

  registerField({ name, getRef, getValue, setValue, validate, reset }) {
    // This does not handle radio buttons correct (as they're supposed to have the same name)
    // @TODO FIX THIS FOR RADIOS
    this.fields = {
      ...this.fields,
      [name]: { getRef, getValue, validate, reset },
    };
  }

  unregsiterField(name) {
    this.fields = Object.keys(this.fields).reduce((fields, field) => {
      if (name === field) {
        return fields;
      }
      return {
        ...fields,
        [field]: fields[field],
      };
    }, {});
  }

  resetForm() {
    Object.keys(this.fields).forEach(
      field => isFunction(this.fields[field].reset) && this.fields[field].reset(),
    );
  }

  render() {
    const { autoComplete, children } = this.props;
    return (
      <form onSubmit={this.handleOnSubmit} autoComplete={autoComplete} {...this.getSpreadProps()}>
        {children}
      </form>
    );
  }
}
