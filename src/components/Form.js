import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from '../helpers/isFunction';

export default class Form extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    beforeSubmit: PropTypes.func,
    afterSubmit: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
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
    this.state = {};

    // This isn't a pure component by any means. We're going to create an object to keep track
    // of all of the fields that get registered with this component.
    this.fields = {};

    [
      'setRef',
      'handleBeforeSubmit',
      'handleOnSubmit',
      'handleAfterSubmit',
      'registerField',
      'unregsiterField',
      'resetForm',
    ].forEach(func => (this[func] = this[func].bind(this)));
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
    };
  }

  handleBeforeSubmit(values) {
    if (isFunction(this.props.beforeSubmit)) {
      return this.props.beforeSubmit(values);
    }
    return Promise.resolve(values);
  }

  handleAfterSubmit(values) {
    if (isFunction(this.props.afterSubmit)) {
      return this.props.afterSubmit(values);
    }
    return Promise.resolve(values);
  }

  handleOnSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const isValid = Object.keys(this.fields).every(field => this.fields[field].validate());
    if (!isValid) {
      console.log('Form is invalid. Field level errors should ensue.');
    } else {
      const values = Object.keys(this.fields).reduce(
        (acc, field) => ({
          ...acc,
          [field]: this.fields[field].getValue(),
        }),
        {},
      );

      console.log(values);
      this.handleBeforeSubmit(values)
        .then(this.props.onSubmit)
        .then(this.handleAfterSubmit);
      console.log('Submitting...');
    }
  }

  registerField({ name, getRef, getValue, setValue, validate, reset }) {
    this.fields = Object.assign({}, this.fields, { [name]: { getRef, getValue, validate, reset } });
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
    Object.keys(this.fields).forEach(field => this.fields[field].reset());
  }

  render() {
    const { autoComplete, children } = this.props;
    return (
      <form onSubmit={this.handleOnSubmit} autoComplete={autoComplete}>
        {children}
      </form>
    );
  }
}
