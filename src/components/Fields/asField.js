import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from '../../helpers/autobind';
import isFunction from '../../helpers/isFunction';

const noErrors = [false];
const hasErrors = errors => errors.filter(x => x).length !== 0;
const noop = () => {};

// This function takes a component...
function asField(WrappedComponent) {
  // ...and returns another component...
  const HOC = class extends Component {
    constructor(props) {
      super(props);
      autobind(this, [
        'getRef',
        'setRef',
        'getValue',
        'setValue',
        'handleOnChange',
        'handleOnFocus',
        'handleOnBlur',
        'validate',
      ]);

      this.state = {
        isValid: !hasErrors(this.runValidations(props.value)),
        value: props.value || '',
      };
    }

    getChildContext() {
      return {
        register: noop,
        unregister: noop,
        autoComplete: this.context.autoComplete,
      };
    }

    componentDidMount() {
      this.register();
    }

    componentWillUnmount() {
      this.unregister();
    }

    getRef() {
      return this.fieldRef;
    }

    setRef(el) {
      this.fieldRef = el;
    }

    getValue() {
      return this.state.value;
    }

    setValue(value) {
      this.setState(prevState => ({
        ...prevState,
        value,
      }));
    }

    validate() {
      return this.maybeUpdateErrors(this.runValidations());
    }

    runValidations() {
      const { validate } = this.props;
      if (Array.isArray(validate)) {
        return validate.map(fn => {
          if (!isFunction(fn)) {
            return false;
          }
          return fn(this.state.value);
        });
      }

      if (isFunction(validate)) {
        return validate(this.state.value);
      }

      return noErrors;
    }

    maybeUpdateErrors(msg) {
      if (msg === false) {
        if (this.state.errors.length !== 0) {
          this.setState(prevState => ({
            ...prevState,
            isValid: true,
            errors: [],
          }));
        }
        // This means it is valid
        return true;
      } else {
        if (Array.isArray(msg) && msg.every(message => message === false)) {
          this.setState(prevState => ({
            ...prevState,
            isValid: true,
            errors: [],
          }));
          return true;
        }
        this.setState(prevState => ({
          ...prevState,
          isValid: false,
          errors: Array.isArray(msg) ? msg : [msg],
        }));
        // This means it is not valid
        return false;
      }
    }

    register() {
      if (isFunction(this.context.register)) {
        this.context.register({
          name: this.props.name,
          validate: this.validate,
          getValue: this.getValue,
          setValue: this.setValue,
          getRef: this.getRef,
          reset: this.reset,
        });
      }
    }

    unregister() {
      if (isFunction(this.context.unregister)) {
        this.context.unregister(this.props.name);
      }
    }

    handleOnChange(event) {
      const { value } = event.target;
      if (value !== this.state.value) {
        this.setValue(value);
      }
      if (isFunction(this.props.onChange)) {
        this.props.onChange(value);
      }
    }

    handleOnFocus() {
      if (isFunction(this.props.onFocus)) {
        this.props.onFocus();
      }
    }

    handleOnBlur() {
      if (isFunction(this.props.onBlur)) {
        this.props.onBlur();
      }
    }

    render() {
      return (
        <WrappedComponent
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onFocus={this.handleOnFocus}
          {...this.props}
        />
      );
    }
  };

  HOC.contextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  HOC.childContextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  return HOC;
}
export default asField;
