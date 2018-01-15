import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from '../helpers/isFunction';

export default class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
  };

  constructor(props) {
    super(props);
    // Fill out with all the things
    this.state = {};

    // This isn't a pure component by any means. We're going to create an object to keep track
    // of all of the fields that get registered with this component.
    this.fields = {};

    ['setRef', 'handleOnSubmit', 'registerField', 'unregsiterField'].forEach(
      func => (this[func] = this[func].bind(this)),
    );
  }

  setRef(el) {
    this.form = el;
  }

  getChildContext() {
    return {
      register: this.registerField,
      unregister: this.unregsiterField,
    };
  }

  handleOnSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const isValid = Object.keys(this.fields).every(field => this.fields[field].validate());
    if (!isValid) {
      console.log('Form is invalid. Field level errors shoudl ensue.');
    }
    const values = Object.keys(this.fields).reduce(
      (acc, field) => ({
        ...acc,
        [field]: this.fields[field].getValue(),
      }),
      {},
    );
    console.log(values);
    console.log('Submitting...');
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

  render() {
    return <form onSubmit={this.handleOnSubmit}>{this.props.children}</form>;
  }
}
