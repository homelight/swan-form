import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from '@flow-form/helpers/dist/autobind';
import isFunction from 'lodash/isFunction';
import classes from '@flow-form/helpers/dist/classes';

// import styles from './Slide.css';

const alwaysTrue = () => true;

export default class Slide extends Component {
  static propTypes = {
    shouldShowIf: PropTypes.func,
  };

  static defaultProps = {
    shouldShowIf: alwaysTrue,
  };

  static contextTypes = {
    registerSlide: PropTypes.func,
    unregisterSlide: PropTypes.func,
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
  };

  static childContextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isValid: true, // consider finding a better way to do this
      fields: {},
    };
    this.registerField = this.registerField.bind(this);
    this.unregisterField = this.unregisterField.bind(this);
    this.fields = {};

    autobind(this, ['setRef', 'isValid', 'registerField', 'unregisterField']);
  }

  getChildContext() {
    return {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
    };
  }

  componentDidMount() {
    this.register();
  }

  // We don't want to rerender on state change
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillUnmount() {
    this.unregister();
  }

  setRef(el) {
    this.ref = el;
  }

  setValid(isValid) {
    this.setState(prevState => ({
      isValid,
    }));
  }

  register() {
    if (isFunction(this.context.registerSlide)) {
      this.context.registerSlide({ index: this.props.index, isValid: this.isValid });
    }
  }

  unregister() {
    if (isFunction(this.context.unregisterSlide)) {
      this.context.unregisterSlide();
    }
  }

  registerField({ name, getRef, getValue, setValue, validate, reset, isValid }) {
    if (isFunction(this.context.registerField)) {
      this.context.registerField({ name, getRef, getValue, setValue, validate, reset });
    }
    this.fields = Object.assign({}, this.fields, {
      [name]: {
        isValid,
        validate,
      },
    });
  }

  unregisterField(name) {
    if (isFunction(this.context.unregisterField)) {
      this.context.unregisterField(name);
    }
    const { [name]: removed, ...remaining } = this.fields;
    this.fields = remaining;
  }

  isValid() {
    // Run through all the validations...
    return Object.keys(this.fields).every(field => {
      const fieldIsValid = this.fields[field].isValid();
      if (!fieldIsValid) {
        // Make the errors appear
        this.fields[field].validate();
      }
      return fieldIsValid;
    });
  }

  render() {
    const { position } = this.props;
    const classNames = classes([
      'ff--slide',
      position === 'before' && 'ff--slide--before',
      position === 'after' && 'ff--slide--after',
    ]);
    return (
      <div className={classNames} ref={this.setRef}>
        {this.props.children}
      </div>
    );
  }
}
