import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from '@flow-form/helpers/dist/autobind';
import isFunction from 'lodash/isFunction';
import classes from '@flow-form/helpers/dist/classes';

const alwaysTrue = () => true;

export default class Slide extends Component {
  static propTypes = {
    shouldShowIf: PropTypes.func,
    index: PropTypes.number.isRequired,
    position: PropTypes.oneOf(['prev', 'current', 'next']).isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]).isRequired,
    className: PropTypes.string,
    getFormValues: PropTypes.func.isRequired,
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

    autobind(this, ['setRef', 'isValid', 'registerField', 'unregisterField']);
  }

  getChildContext() {
    // We need to intercept the register field context hook that the Form component so that we can
    // test that all the fields are valid before moving on to the next slide.
    return {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
    };
  }

  componentDidMount() {
    if (isFunction(this.context.registerSlide)) {
      this.context.registerSlide({ index: this.props.index, isValid: this.isValid });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { position } = this.props;
    const next = nextProps.position;

    if (position !== next) {
      this.setState({
        willExit: position === 'current',
        willExitPrev: position === 'current' && next === 'before', // hitting the next button
        willExitNext: position === 'current' && next === 'after', // hitting the prev button
        willShow: next === 'current',
        hasShown: !this.state.hasShown ? next === 'current' : true,
        lastPosition: position,
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.willExitPrev) {
      if (isFunction(this.props.afterSlide)) {
        this.props.afterSlide();
      }
    }
  }

  // We don't want to rerender on state change
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillUnmount() {
    if (isFunction(this.context.unregisterSlide)) {
      this.context.unregisterSlide();
    }
  }

  setRef(el) {
    this.ref = el;
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
