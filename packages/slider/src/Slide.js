import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { autobind, classes, keyCodes } from '@flow-form/helpers';

const { ENTER, TAB } = keyCodes;

const alwaysTrue = () => true;

export default class Slide extends Component {
  static propTypes = {
    shouldShowIf: PropTypes.func,
    index: PropTypes.number.isRequired,
    position: PropTypes.oneOf(['prev', 'current', 'next']).isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]).isRequired,
    className: PropTypes.string,
    getFormValues: PropTypes.func.isRequired,
    afterSlide: PropTypes.func,
  };

  static defaultProps = {
    shouldShowIf: alwaysTrue,
    className: '',
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
    handleKey: PropTypes.func, // @TODO temp
    handleTab: PropTypes.bool, // @TODO temp
  };

  constructor(props) {
    super(props);
    this.state = {
      lastPosition: props.position,
      hasShown: false,
      willEnter: false,
      willExit: false,
    };
    this.registerField = this.registerField.bind(this);
    this.unregisterField = this.unregisterField.bind(this);
    this.fields = {};

    autobind(this, [
      'setRef',
      'getRef',
      'isValid',
      'registerField',
      'unregisterField',
      'handleKey',
    ]);
  }

  getChildContext() {
    // We need to intercept the register field context hook that the Form component so that we can
    // test that all the fields are valid before moving on to the next slide.
    return {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
      handleKey: this.handleKey, // @TODO temp
      handleTab: true, // @TODO temp
    };
  }

  componentDidMount() {
    if (isFunction(this.context.registerSlide)) {
      const { index, beforeExit } = this.props;
      this.context.registerSlide({
        index,
        beforeExit,
        isValid: this.isValid,
        getRef: this.getRef,
      });
    }
    if (this.props.position === 'current' && this.fields[0]) {
      const firstField = this.fields[0].getRef();
      firstField.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { position } = this.props;
    const next = nextProps.position;
    if (position !== next) {
      this.setState({
        willExit: position === 'current',
        willExitPrev: position === 'current' && next === 'prev', // hitting the next button
        willExitNext: position === 'current' && next === 'next', // hitting the prev button
        willShow: next === 'current',
        hasShown: !this.state.hasShown ? next === 'current' : true,
        lastPosition: position,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.willExitPrev) {
      if (isFunction(this.props.afterSlide)) {
        this.props.afterSlide({ values: this.props.getFormValues(), props: this.props.slideProps });
      }
    }
  }

  // We don't want to rerender on state change
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate() {
    if (this.props.position === 'current' && this.fields[0]) {
      const firstField = this.fields[0].getRef();
      firstField.focus();
    }
  }

  componentWillUnmount() {
    if (isFunction(this.context.unregisterSlide)) {
      this.context.unregisterSlide();
    }
  }

  // this is a hack for tabs/enter @TODO temp
  handleKey(keyCode, modifiers, type, name, element) {
    const keys = Object.keys(this.fields);
    let focusNext = false;
    if (keyCode === ENTER || keyCode === TAB) {
      if (modifiers.shiftKey) {
        for (let i = keys.length - 1; i >= 0; i--) {
          if (keys[i] === name) {
            focusNext = true;
          } else if (focusNext) {
            const nextEl = this.fields[keys[i]].getRef();
            nextEl.focus();
            break;
          }
        }
      } else {
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] === name) {
            focusNext = true;
          } else if (focusNext) {
            const nextEl = this.fields[keys[i]].getRef();
            nextEl.focus();
            break;
          }
        }
      }
    }
  }

  setRef(el) {
    this.ref = el;
  }

  getRef(el) {
    return this.ref;
  }

  registerField({ name, getRef, getValue, setValue, validate, reset, isValid }) {
    if (isFunction(this.context.registerField)) {
      this.context.registerField({ name, getRef, getValue, setValue, validate, reset });
    }
    this.fields = {
      ...this.fields,
      [name]: {
        isValid,
        validate,
        getRef,
      },
    };
  }

  unregisterField(name) {
    if (isFunction(this.context.unregisterField)) {
      this.context.unregisterField(name);
    }
    const { [name]: removed, ...remaining } = this.fields;
    this.fields = remaining;
  }

  /**
   * Checks whether all registered fields on the slide are valid (they pass `validate` functions).
   *
   * @return {Boolean} [description]
   */
  isValid() {
    // Run through all the validations...
    return Object.keys(this.fields).every(field => {
      // Get the validity from the registered field
      const fieldIsValid = this.fields[field].isValid();
      if (!fieldIsValid) {
        // Make the errors appear
        this.fields[field].validate();
      }
      // Return the slide's validity to the slider
      return fieldIsValid;
    });
  }

  render() {
    const { className, position } = this.props;
    const classNames = classes([
      className,
      'ff--slide',
      position === 'prev' && 'ff--slide--prev',
      position === 'current' && 'ff--slide--current',
      position === 'next' && 'ff--slide--next',
    ]);
    return (
      <div className={classNames} ref={this.setRef}>
        {this.props.children}
      </div>
    );
  }
}
