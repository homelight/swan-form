import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '../../helpers/classes';
import hasOwnProperty from '../../helpers/hasOwnProperty';
import isObject from '../../helpers/isObject';

import styles from './Field.css';

const INPUT_TYPES = [
  // 'button',
  // 'checkbox',
  // 'color',
  // 'date',
  // 'datetime-local',
  // 'email',
  // 'file',
  // 'hidden',
  // 'image',
  // 'month',
  // 'number',
  'password',
  // 'radio',
  // 'range ',
  // 'reset',
  // 'search',
  // 'submit',
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

  'autoComplete', // find the list of possible ones

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

const isFunction = func => typeof func === 'function';

export default class Field extends Component {
  static defaultProps = {
    validateDebounceTimeout: 200,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(FIELD_TYPES).isRequired,

    validate: PropTypes.func,

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

    this.state = {
      value: props.value || '',
      errors: [],
      isValid: true, // not sure what to do about this
      isDirty: false,
      isTouched: false,
    };

    this.debounceValidateTimer = null;

    // Bind some handlers
    ['onChange', 'onBlur', 'onFocus', 'setRef', 'renderOption', 'renderOptions'].forEach(func => {
      this[func] = this[func].bind(this);
    });
  }

  componentDidMount() {
    if (isFunction(this.props.register)) {
      this.register();
    }
    if (this.props.autoFocus) {
      const { fieldRef } = this;

      fieldRef.focus();
      // We're going to try to position the cursor in the correct position for editing, so, if there
      // is a value already, we'll get the length and set the cursor to that.
      const end = this.state.value.length; // @todo, we might have to turn this into a string

      // See if setSelectionRange exists, if so, then use that
      if (isFunction(fieldRef.setSelectionRange)) {
        this.fieldRef.setSelectionRange(end, end);
      } else if (isFunction(fieldRef.createTextRange)) {
        const range = fieldRef.createTextRange;
        range.move('character', end);
        range.select();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }

    if (this.state.value !== nextState.value) {
      return true;
    }

    if (this.state.errors !== nextState.errors) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    if (isFunction(this.props.unregister)) {
      this.unregister();
    }
  }

  setRef(el) {
    this.fieldRef = el;
  }

  getSpreadProps() {
    return COMMON_INPUT_PROPS.reduce((acc, prop) => {
      if (hasOwnProperty(this.props, prop)) {
        acc[prop] = this.props[prop];
      }
      return acc;
    }, {});
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
    const { validate } = this.props;

    let errors = [];
    if (Array.isArray(validate)) {
      return this.maybeUpdateErrors(
        validate.map(fn => {
          if (!isFunction(fn)) {
            return false;
          }
          return fn(this.state.value);
        }),
      );
    }

    if (isFunction(validate)) {
      return this.maybeUpdateErrors(validate(this.state.value));
    }

    return this.maybeUpdateErrors(false);
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
    } else {
      this.setState(prevState => ({
        ...prevState,
        isValid: false,
        errors: Array.isArray(msg) ? msg : [msg],
      }));
    }
  }

  onChange(event) {
    const { value } = event.target;
    const { validateWhileTyping, validateDebounceTimeout, onChange } = this.props;

    if (validateWhileTyping) {
      window.clearTimeout(this.debounceValidateTimer);
      this.debounceValidateTimer = setTimeout(() => this.validate(), validateDebounceTimeout);
    }

    if (this.state.value !== value) {
      this.setState(prevState => ({
        ...prevState,
        value,
        isDirty: value !== this.props.value,
      }));

      // Call user supplied function if given
      if (isFunction(onChange)) {
        onChange(value);
      }
    }
  }

  onFocus(event) {
    const { onFocus } = this.props;
    console.log(`${this.props.name}:: on focus`);

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
        <label>
          <span className="flowform--field--label">{label}</span>
          <span className={fieldStyle}>{children}</span>
          <span className="flowform--field--errors">{this.state.errors.join(',')}</span>
        </label>
      );
    }
    return <span className={fieldStyle}>{children}</span>;
  }

  register() {
    const { name, register } = this.props;
    if (isFunction(register)) {
      register({
        name,
        validate: this.validate,
        getValue: this.getValue,
        getRef: this.getRef,
      });
    }
  }

  unregister() {
    const { name } = this.props;
    if (isFunction(unregister)) {
      unregister({ name });
    }
  }

  getValue() {
    return this.state.value;
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
        value={value}
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
        value={value}
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
