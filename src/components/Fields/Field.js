import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '../../helpers/classes';
import isFunction from 'lodash/isFunction';
import hasOwnProperty from '../../helpers/hasOwnProperty';
import isObject from 'lodash/isObject';
import autobind from '../../helpers/autobind';
import runValidations from './shared/runValidations';
import noErrors from './shared/noErrors';
import hasErrors from './shared/hasErrors';
import noop from './shared/noop';
import moveCursorToEnd from './shared/moveCursor';

import { ENTER } from './shared/keyCodes';

import styles from './Field.css';

const INPUT_TYPES = [
  // 'button',
  // 'checkbox',
  // 'color',
  'date',
  // 'datetime-local',
  'email',
  // 'file',
  // 'hidden',
  // 'image',
  // 'month',
  'number',
  'password',
  // 'radio',
  // 'range ',
  'reset',
  // 'search',
  'submit',
  // 'tel',
  'text',
  // 'time',
  // 'url',
  // 'week',
];

const COMMON_INPUT_PROPS = [
  'name',

  // Built in Validation Properties
  'required',
  'pattern',
  'formNoValidate',

  // Control access to something:
  'disabled',
  'readOnly',

  // 'autoComplete', // find the list of possible ones

  'maxLength',
  'placeholder',
  'checked',
  'maxLength',

  'min',
  'max',

  'size', // size of input (in characters)

  // interval fields
  'step',

  // file fields
  'accept',

  // image fields
  'alt', // alternate text for images
  'height', // height of uploaded image
  'width', // width of uploaded image
  'src', // image to use as submit button

  'multiple', // more than one value in input

  // textarea only
  'rows',
  'cols',
  'wrap', // 'hard' or 'soft'
];

const INPUT_TEXT_PROPS = [];

const TEXTAREA_PROPS = [];

const INPUT_NUMBER_PROPS = [];

const FIELD_TYPES = [...INPUT_TYPES, 'select', 'textarea'];

function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((val, index) => b[index] === val);
  }
  return a === b;
}

export default class Field extends Component {
  static defaultProps = {
    validateDebounceTimeout: 200,
  };

  static contextTypes = {
    register: PropTypes.func,
    unregister: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(FIELD_TYPES).isRequired,

    validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),

    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.object,
    ]),

    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,

    register: PropTypes.func,
    unregister: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.isMultipleSelect = props.type === 'select' && props.multiple === true;

    const state = {
      value: props.value || (this.isMultipleSelect ? [''] : ''),
      errors: [],
      isValid: !hasErrors(runValidations(props.validate, props.value)),
      isDirty: false,
      isTouched: false,
    };

    this.state = Object.assign({}, state);
    this.initialState = Object.assign({}, state);

    this.debounceValidateTimer = null;

    // Autobind factory
    // @TODO bind fewer things
    autobind(this, [
      // Bind some handlers for use with events
      'onChange',
      'onBlur',
      'onFocus',
      'setRef',
      // These need to be bound because of how they're called
      'renderOption',
      'renderOptions',
      // Bind these so that parental compenents can use them
      'getValue',
      'setValue',
      // In case we need to reset the field
      'reset',
      'validate',
      'runValidations',
      'isValid',
      'preventSubmitOnEnter',
    ]);
  }

  componentDidMount() {
    if (isFunction(this.context.register)) {
      this.register();
    }
    if (this.props.autoFocus) {
      const { fieldRef } = this;

      fieldRef.focus();
      moveCursorToEnd(fieldRef);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // In case someone wants to change a select field from single to multiple with props
  //   if (nextProps.type === 'select' && nextProps.multiple !== this.props.multiple) {
  //     this.isMultipleSelect = nextProps.type === 'select' && nextProps.multiple === 'true';
  //     // We will run into the problem that the value will be an array when we expect a string
  //     // @TODO fix that, but how?
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }

    if (this.state.value !== nextState.value) {
      return true;
    }

    if (!isEqual(this.state.errors, nextState.errors)) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    if (isFunction(this.context.unregister)) {
      this.unregister();
    }
  }

  setRef(el) {
    const { setRef } = this.props;
    if (setRef && isFunction(setRef)) {
      setRef(el);
    }
    this.fieldRef = el;
  }

  preventSubmitOnEnter(event) {
    if (event.keyCode === ENTER) {
      event.preventDefault();
    }
  }

  getSpreadProps() {
    // This might be a bad pattern because it might always return a new object, forcing a
    // rerender. Double-check this and maybe do it a different way
    const spreadProps = COMMON_INPUT_PROPS.reduce((acc, prop) => {
      if (hasOwnProperty(this.props, prop)) {
        acc[prop] = this.props[prop];
      }
      return acc;
    }, {});
    if (this.context.autoComplete === 'off') {
      spreadProps.autoComplete = 'off';
    } else if (this.props.autoComplete) {
      spreadProps.autoComplete = this.props.autoComplete;
    }

    // Most modern browsers ignore the "off" value when trying to set a form, so we'll attempt a
    // workaround that may not work so well (applied to Chrome only for now).
    // See https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
    // for an explanation.
    //
    // @TODO consider taking this out and adding in a note in the README saying it won't work.
    //
    // If we update this condition to something other than Chrome, then we need to update the README.
    if (spreadProps.autoComplete === 'off') {
      if (global && global.navigator && global.navigator.appVersion.includes('Chrome')) {
        spreadProps.autoComplete = 'nope';
      }
    }

    return spreadProps;
  }

  format() {
    const { formatter } = this.props;
    const { value } = this.state;

    if (isFunction(formatter)) {
      return formatter(value);
    }

    return value;
  }

  validate() {
    return this.maybeUpdateErrors(this.runValidations());
  }

  runValidations() {
    return runValidations(this.props.validate, this.state.value);
  }

  isValid() {
    return !hasErrors(this.runValidations());
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

  onChange(event) {
    const { value } = event.target;
    const { validateWhileTyping, validateDebounceTimeout, onChange } = this.props;

    if (validateWhileTyping) {
      // If we are to validate while typing, then we'll debunce it. Basically, just set a timeout,
      // and, on each change event, clear the timeout and set a new one. The last one will go
      // through. This should help by not showing errors too early or, if there is a remote call
      // for the validation, not making too many worthless ajax requests
      window.clearTimeout(this.debounceValidateTimer);
      this.debounceValidateTimer = setTimeout(() => this.validate(), validateDebounceTimeout);
    }

    if (this.isMultipleSelect) {
      const { options } = event.target;
      const values = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      if (!isEqual(this.state.value, values)) {
        this.setValue(values);
      }
    } else if (this.state.value !== value) {
      // Only run the setState method if the value is actually different
      this.setValue(value);
    }
  }

  onFocus(event) {
    const { onFocus } = this.props;
    console.log(`${this.props.name}:: on focus`);

    // On most fields, add in a handler to prevent a form submit on enter
    if (!['textarea', 'button', 'submit', 'reset'].includes(this.props.type)) {
      document.addEventListener('keydown', this.preventSubmitOnEnter, false);
    }

    if (this.state.isTouched === false) {
      this.setState(prevState => ({
        ...this.state,
        isTouched: true,
      }));
    }

    // Call user supplied function if given
    if (isFunction(onFocus)) {
      onFocus();
    }
  }

  onBlur(event) {
    const { onBlur, validate, asyncValidate } = this.props;
    console.log(`${this.props.name}:: on blur`);

    if (this.props.type !== 'textarea') {
      console.log('removing prevent submit for', this.props.name, this.props.type);
      document.removeEventListener('keydown', this.preventSubmitOnEnter);
    }

    if (asyncValidate && validate) {
      this.validate();
    }

    // Call user supplied function if given
    if (isFunction(onBlur)) {
      onBlur();
    }
  }

  maybeWrapInLabel(children) {
    const { label, required } = this.props;
    const fieldStyle = classes(['flowform--field--field', required && 'flowform--field--required']);
    if (label) {
      return (
        <label className={classes([!this.state.isValid && 'flowform--field-has-errors'])}>
          <span className="flowform--field--label">{label}</span>
          <span className={fieldStyle}>{children}</span>
          <span className="flowform--field--errors">
            {this.state.errors.filter(err => err).join(',')}
          </span>
        </label>
      );
    }
    return (
      <span className={classes([!this.state.isValid && 'flowform--field-has-errors'])}>
        <span className={fieldStyle}>{children}</span>
        <span className="flowform--field--errors">
          {this.state.errors.filter(err => err).join(',')}
        </span>
      </span>
    );
  }

  register() {
    if (isFunction(this.context.register)) {
      this.context.register({
        name: this.props.name,
        getRef: this.getRef,
        getValue: this.getValue,
        setValue: this.setValue,
        validate: this.validate,
        isValid: this.isValid,
        reset: this.reset,
      });
    }
  }

  unregister() {
    if (isFunction(this.context.unregister)) {
      this.context.unregister(this.props.name);
    }
  }

  reset() {
    // Clobber the state by setting back to the initialState
    this.setState(this.initialState);
    // If we were provided a change function, then call it with the initial value
    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.initialState.value);
    }
  }

  /**
   * Gets the value of the field
   *
   * A bound version of this method is sent with the register method so that any component that
   * controls this field can access its value.
   *
   * @return {any} the value of the field
   */
  getValue() {
    return this.state.value;
  }

  /**
   * Set the value of the field
   *
   * This is a different method because (1) a bit of code reuse, but more importantly (2) the parent
   * a parent component might want to force update the value, hence, we provide a backdoor to the
   * setState method. This will be sent as part of the callback in the `register` method, so that
   * anything that this registers with shall have access to update the value.
   *
   * @param {any} value the value to set
   */
  setValue(value, resetErrors = false, resetTouched = false) {
    this.setState(prevState => ({
      ...prevState,
      errors: resetErrors === false ? prevState.errors : [],
      value,
      isTouched: resetTouched === true ? false : true,
      isDirty: value !== this.props.value,
    }));

    // Call user supplied function if given
    if (isFunction(this.props.onChange)) {
      this.props.onChange(value);
    }
  }

  getRef() {
    return this.fieldRef;
  }

  renderInputField() {
    const { name, required, type } = this.props;
    const { value } = this.state;
    return (
      <input
        type={type}
        value={this.format(value)}
        ref={this.setRef}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        {...this.getSpreadProps()}
      />
    );
  }

  renderTextArea() {
    const { name, type } = this.props;
    const { value } = this.state;

    return (
      <textarea
        value={this.format(value)}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        ref={this.setRef}
        {...this.getSpreadProps()}
      />
    );
  }

  // The way we nest options in a select can be a bit difficult, so we're going to break this into
  // a few different functions
  renderSelect() {
    const { options } = this.props;
    const { value } = this.state;
    return (
      <select
        value={value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        ref={this.setRef}
        {...this.getSpreadProps()}
      >
        {this.renderOptions(options)}
      </select>
    );
  }

  renderOption(option) {
    if (typeof option === 'string') {
      return <option key={option}>{option}</option>;
    }
    if (isObject(option)) {
      if (hasOwnProperty(option, 'label') && hasOwnProperty(option, 'value')) {
        const { label, value } = option;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      }
      return Object.keys(option).map(label => (
        <optgroup key={label} label={label}>
          {this.renderOptions(option[label])}
        </optgroup>
      ));
    }
    // Cannot figure out what to do here.
    return null;
  }

  renderOptions(options) {
    if (Array.isArray(options)) {
      return options.map(this.renderOption);
    } else if (isObject(options)) {
      return Object.keys(options).map(option => {
        if (['string', 'number'].includes(typeof options[option])) {
          return (
            <option key={options[option]} value={options[option]}>
              {option}
            </option>
          );
        }
        if (isObject(options[option]) || Array.isArray(options[option])) {
          return (
            <optgroup key={option} label={option}>
              {this.renderOptions(options[option])}
            </optgroup>
          );
        }
        // Cannot figure out what to do here.
        return null;
      });
    }
  }

  renderField() {
    const { type } = this.props;

    if (INPUT_TYPES.includes(type)) {
      return this.renderInputField();
    }
    if (type === 'textarea') {
      return this.renderTextArea();
    }
    if (type === 'select') {
      return this.renderSelect();
    }
    return <div>Unsupported Field Type</div>;
  }

  render() {
    return this.maybeWrapInLabel(this.renderField());
  }
}
