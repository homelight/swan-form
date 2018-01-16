import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '../../helpers/classes';
import isFunction from 'lodash/isFunction';
import hasOwnProperty from '../../helpers/hasOwnProperty';
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
import autobind from '../../helpers/autobind';
import runValidations from './shared/runValidations';
import noErrors from './shared/noErrors';
import hasErrors from './shared/hasErrors';
import noop from './shared/noop';
import moveCursorToEnd from './shared/moveCursor';

import { ENTER } from './shared/keyCodes';

import styles from './Field.css';

const INPUT_TYPES = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio', // radio
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

const COMMON_INPUT_PROPS = [
  'name',

  'autoFucus',

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
  // 'checked',
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

  /**
   * Lifecycle Methods
   */

  constructor(props) {
    super(props);

    // We'll cache this because it's used in a few places and should not change
    this.isMultipleSelect = props.type === 'select' && props.multiple === true;

    // Establish the initial state
    const state = {
      // The value for a multiselect needs to be an array, and we need to do something special for checkboxes. This is convoluted
      value:
        (props.type === 'checkbox' ? props.checked || props.value : props.value) ||
        (this.isMultipleSelect ? [] : ''),
      errors: [],
      // It could start in an invalid state, so check
      isValid: !hasErrors(runValidations(props.validate, props.value)),
      isDirty: false,
      // if we autoFocus, then it's touched
      isTouched: !!this.props.autoFocus,
    };

    // Setup the state, and also setup the initialState in case we get a queue to reset
    this.state = { ...state };
    this.initialState = { ...state };

    // This is used for debouncing validate functions while typing
    this.debounceValidateTimer = null;

    // Autobind factory
    // @TODO bind fewer things
    autobind(this, [
      // Bind some handlers for use with events
      'onChange',
      'onBlur',
      'onFocus',
      'onClick',
      'setRef',
      'getRef',
      'format',
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
    // Register with the any higher component that needs to keep track of this field
    this.register();

    // Emulate the browser autoFocus if (1) requested and (2) possible
    if (this.props.autoFocus) {
      // Actually focus on the field
      this.fieldRef.focus();
      // Move the cursor to the end of the input if there is a value
      moveCursorToEnd(this.fieldRef);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props === nextProps && this.state === nextState) {
      return false;
    }

    if (this.state.value !== nextState.value) {
      return true;
    }

    // Update if the errors are different
    if (!isEqual(this.state.errors, nextState.errors)) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    // Since we're unmounting, unregister from any higher components — this
    // means that the value will no longer be available
    this.unregister();
  }

  /*****************************************************************************
   * Registrations Methods
   *
   * Fields register with whatever controls them. So, if they are within a form,
   * the form can act on all of the fields (via bound functions passed by
   * context). This enables things like forms to get all the values for a submit
   * action or to pass all the values to determine if a slide should show, etc..
   ****************************************************************************/

  /**
   * Use the registration function passed by context
   * @return {void}
   */
  register() {
    if (isFunction(this.context.register)) {
      this.context.register({
        // This should be a unique key
        name: this.props.name,
        // In case we need to grab the ref @TODO maybe remove
        getRef: this.getRef,
        // Gets the value from the field
        getValue: this.getValue,
        // setValue can be useful for overwriting a value
        setValue: this.setValue,
        // The form must call all the validation functions synchronously
        validate: this.validate,
        // Runs the validation functions to see if the field is valid
        isValid: this.isValid,
        // Resets the field
        reset: this.reset,
      });
    }
  }

  /**
   * Use the unregistration function passed by context
   * @return {void}
   */
  unregister() {
    if (isFunction(this.context.unregister)) {
      this.context.unregister(this.props.name);
    }
  }

  /**
   * Handlers
   */

  /**
   * Handles changes in value for the component
   *
   * Since, this handles all field types,
   *
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  onChange(event) {
    const { checked, value } = event.target;
    const { validateWhileTyping, validateDebounceTimeout, onChange, type } = this.props;

    if (validateWhileTyping) {
      // If we are to validate while typing, then we'll debunce it. Basically, just set a timeout,
      // and, on each change event, clear the timeout and set a new one. The last one will go
      // through. This should help by not showing errors too early or, if there is a remote call
      // for the validation, not making too many worthless ajax requests
      window.clearTimeout(this.debounceValidateTimer);
      this.debounceValidateTimer = setTimeout(() => this.validate(), validateDebounceTimeout);
    }

    // If this is `<input type='select' multiple, then our values are arrays and need to be
    // handled differently.
    if (this.isMultipleSelect) {
      // Grab the options off of event.target and cycle through all of them, this is an
      // HTMLOptionsCollection, but it's iterable.
      const { options } = event.target;

      const values = [];
      for (let i = 0; i < options.length; i++) {
        // Grab all the options that are selected
        if (options[i].selected) {
          values.push(options[i].value);
        }
      }
      // Only update the state value if the arrays are actually different
      if (!isEqual(this.state.value, values)) {
        this.setValue(values);
      }
    } else if (this.state.value !== value) {
      // Only run the setState method if the value is actually different
      this.setValue(type === 'checkbox' ? !checked : value);
    }
  }

  /**
   * Event Handlers
   */

  onFocus(event) {
    const { onFocus } = this.props;

    // On most fields, add in a handler to prevent a form submit on enter
    if (!['textarea', 'checkbox', 'button', 'submit', 'reset'].includes(this.props.type)) {
      document.addEventListener('keydown', this.preventSubmitOnEnter, false);
    }

    // If this field has yet to be touched, then set it as touched
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

    if (!['textarea', 'checkbox', 'button', 'submit', 'reset'].includes(this.props.type)) {
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

  onClick(event) {
    // if (this.props.type === 'checkbox') {
    //   console.log(this.state.value);
    //   this.setValue(! this.state.value);
    // }
    if (isFunction(this.props.onClick)) {
      this.props.onClick();
    }
  }

  preventSubmitOnEnter(event) {
    if (event.keyCode === ENTER) {
      event.preventDefault();
    }
  }

  /**
   * Refs
   */

  setRef(el) {
    const { setRef } = this.props;
    if (setRef && isFunction(setRef)) {
      setRef(el);
    }
    this.fieldRef = el;
  }

  getRef() {
    return this.fieldRef;
  }

  /**
   * Value Functions
   */

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

  reset() {
    // Clobber the state by setting back to the initialState
    this.setState(this.initialState);
    // If we were provided a change function, then call it with the initial value
    if (isFunction(this.props.onChange)) {
      this.props.onChange(this.initialState.value);
    }
  }

  /**
   * Validation and Errors
   */

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

  /**
   * Formatting
   */

  format() {
    const { formatter } = this.props;
    const { value } = this.state;

    if (isFunction(formatter)) {
      return formatter(value);
    }

    return value;
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

  /**
   * Render methods
   */

  getSpreadProps() {
    // This might be a bad pattern because it might always return a new object, forcing a
    // rerender. Double-check this and maybe do it a different way
    const spreadProps = COMMON_INPUT_PROPS.reduce((acc, prop) => {
      if (
        prop === 'checked' &&
        ['radio', 'checkbox'].includes(this.props.type) &&
        this.state.value
      ) {
        acc[prop] = this.state.value;
      } else if (hasOwnProperty(this.props, prop)) {
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

  renderInputField() {
    const { name, required, type } = this.props;
    const { value } = this.state;
    return (
      <input
        type={type}
        value={'radio' === type ? this.props.value : this.format(value)}
        ref={this.setRef}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onClick={this.onClick}
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
        onClick={this.onClick}
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
        value={this.format(value)}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onClick={this.onClick}
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
    return (
      <span dangerouslySetInnerHTML={{ __html: `<!-- Unsupported Field Type (${type}) -->` }} />
    );
  }

  render() {
    return this.maybeWrapInLabel(this.renderField());
  }
}
