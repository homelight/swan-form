import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { autobind, hasOwnProperty, noErrors } from '@flow-form/helpers';

/**
 * Duck-type check for a promise
 *
 * @todo  we might consider doing something better than this
 *
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
const isPromise = obj =>
  !!obj && ['function', 'object'].includes(typeof obj) && typeof obj.then === 'function';

// These are fields that we will automatically pull out of the form as they are just the
// automatically generated names for the submit and reset buttons
const fieldToRemove = ['ff--reset', 'ff--submit'];

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
    beforeSubmit: PropTypes.func, // eslint-disable-line
    /**
     * A function run after a successful submit
     */
    afterSubmit: PropTypes.func, // eslint-disable-line
    /**
     * Turn on or off autocomplete for forms (does not always work)
     */
    autoComplete: PropTypes.oneOf(['on', 'off']), // maybe change this to bool?
    /**
     * Turn off native form validation
     */
    noValidate: PropTypes.bool,
    /**
     * The form should have some fields
     */
    children: PropTypes.any.isRequired,
  };

  static defaultProps = {
    autoComplete: 'on',
    noValidate: false,
  };

  static contextTypes = {
    registerForm: PropTypes.func,
    unregisterForm: PropTypes.func,
  };

  static childContextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    reset: PropTypes.func,
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.func,
  };

  constructor(props) {
    super(props);

    ['acceptCharset', 'action', 'target'].forEach(prop => {
      if (props[prop]) {
        /* eslint-disable no-console */
        console.error(
          `FlowForm Error: Do not provide a '${prop}' prop for a form. Instead, handle form submission with an onSubmit handler to submit and do any necessary transforms there.`,
        );
        /* eslint-enable no-console */
      }
    });

    // Fill out with all the things
    this.state = {
      isSubmitting: false,
      hasSubmitted: false,
      hasSubmitError: false,
      errors: noErrors,
    };

    // This isn't a pure component by any means. We're going to create an object to keep track
    // of all of the fields that get registered with this component. We're avoiding keeping track
    // of these in `state` because that would cause unnecessary re-renders and be quite
    // annoying.
    this.fields = {};

    autobind(this, [
      'getValues',
      'handleAfterSubmit',
      'handleBeforeSubmit',
      'handleOnSubmit',
      'handleSubmit',
      'resetForm',
      'setRef',
      'registerField',
      'unregsiterField',
    ]);

    this.isSubmitting = this.getValue.bind(this, 'isSubmitting');
  }

  getChildContext() {
    return {
      autoComplete: this.props.autoComplete,
      isSubmitting: this.isSubmitting,
      onSubmit: this.handleOnSubmit,
      registerField: this.registerField,
      reset: this.resetForm,
      unregisterField: this.unregsiterField,
    };
  }

  componentDidMount() {
    if (this.context && isFunction(this.context.registerForm)) {
      this.context.registerForm({
        name: this.props.name,
        getValues: this.getValues,
        submit: this.handleOnSubmit,
      });
    }
  }

  componentWillUnmount() {
    if (this.context && isFunction(this.context.unregisterForm)) {
      this.context.unregisterForm(this.props.name);
    }
  }

  setRef(el) {
    this.form = el;
  }

  getValue(key) {
    if (hasOwnProperty(this.state, key)) {
      return this.state[key];
    }
    return null;
  }

  getValues() {
    return Object.keys(this.fields)
      .filter(field => !fieldToRemove.includes(field))
      .reduce(
        (acc, field) => ({
          ...acc,
          [field]: this.fields[field].getValue(),
        }),
        {},
      );
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
    // Update the state to show that we are currently submitting.
    this.setState(prevState => ({
      ...prevState,
      isSubmitting: true,
    }));

    return new Promise((res, rej) => {
      // First, synchronously validate all the fields. `required` and `pattern` fields that
      // latch onto the native browser events will block the submit event, so we care only
      // about user supplied validation functions. This will also make field errors appear
      // everwhere. (@TODO do something to help identify fields in slider forms)
      const isValid = Object.keys(this.fields).every(field => this.fields[field].validate());

      if (!isValid) {
        // Reject the promise and leave the function. We should handle this.
        return rej({ error: 'Fields not valid.' });
      }

      // Grab all the field values
      const values = this.getValues();

      if (isFunction(this.props.beforeSubmit)) {
        // If there a user supplied callback, then run it and resolve on its return.
        // However, we should probably check to see if it's a promise, or do some
        // other things here to make the hook better.
        return res(this.props.beforeSubmit(values));
      }
      return res(values);
    });
  }

  handleAfterSubmit(values) {
    const { afterSubmit } = this.props;
    this.setState(prevState => ({
      ...prevState,
      isSubmitting: false,
      hasSubmitted: true,
      hasSubmitError: false,
      errors: noErrors,
    }));

    if (isFunction(afterSubmit)) {
      // If after submit is a promise, then execute and return
      if (isPromise(afterSubmit)) {
        return afterSubmit(values);
      }
      // If it's not a promise, then wrap in a promise.resolve
      return Promise.resolve(afterSubmit(values));
    }
    // Resolve the promise with the values.
    return Promise.resolve(values);
  }

  handleSubmit(values) {
    const result = this.props.onSubmit(values);
    return isPromise(result) ? result : Promise.resolve(result);
  }

  handleOnSubmit(event) {
    // We can call this event manually, so, we might not always have an event
    if (event) {
      // Prevent the form from doing anything native
      event.preventDefault();
      event.stopPropagation();
    }

    this.handleBeforeSubmit()
      .then(values => this.handleSubmit(values))
      .then(values => this.handleAfterSubmit(values))
      .catch(errors =>
        this.setState(prevState => ({
          ...prevState,
          isSubmitting: false,
          hasSubmitError: true,
          hasSubmitted: true,
          errors,
        })),
      );
  }

  registerField({ name, getRef, getValue, setValue, validate, reset }) {
    this.fields = {
      ...this.fields,
      [name]: { getRef, getValue, validate, reset, setValue },
    };
  }

  unregsiterField(name) {
    const { [name]: removed, ...remaining } = this.fields;
    this.fields = remaining;
  }

  resetForm() {
    // @TODO not quite working for all cases
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
