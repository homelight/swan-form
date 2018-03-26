/* global document, window */
/* eslint-disable react/prop-types, react/sort-comp */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

import {
  hasErrors,
  hasOwnProperty,
  keyCodes,
  moveCursor,
  emptyArray,
  noop,
  runValidations,
} from '@flow-form/helpers';

const { ENTER, TAB } = keyCodes;

function getInitialValue(props) {
  if (props.type === 'checkbox' && isObject(props)) {
    if (hasOwnProperty(props, 'checked')) {
      return !!props.checked;
    } else if (hasOwnProperty(props, 'defaultChecked')) {
      return !!props.defaultChecked;
    }
    return !!props.value;
  }
  if (props.value) {
    return props.value;
  }
  if (props.type === 'select' && props.multiple === true) {
    return [''];
  }
  return '';
}

/**
 * Wraps a component to treat it like a field (a controlled input)
 *
 * This can be used to create complex fields as well
 *
 * @param  {React.Component|React.Element} WrappedComponent The component to turn into a field
 * @param  {Object} options   [description]
 * @return {[type]}                  [description]
 */
function asField(WrappedComponent, options = {}) {
  return class extends PureComponent {
    static displayName = `asField(${WrappedComponent.displayName || 'Component'})`;

    static propTypes = {
      registerWrapped: PropTypes.bool,
      /**
       * Number of ms to delay asyncValidation while typing
       * @type {Number}
       */
      validateDebounceTimeout: PropTypes.number,
    };

    static defaultProps = {
      registerWrapped: true,
      validateDebounceTimeout: 200,
    };

    static contextTypes = {
      registerField: PropTypes.func,
      unregisterField: PropTypes.func,
    };

    static childContextTypes = {
      registerField: PropTypes.func,
      unregisterField: PropTypes.func,
    };

    constructor(props) {
      super(props);

      // We'll cache this because it's used in a few places and should not change
      this.isMultipleSelect = props.type === 'select' && props.multiple === true;

      // Establish the initial state
      const state = {
        value: getInitialValue(props),
        errors: emptyArray,
        isValid: !hasErrors(runValidations(props.validate, props.value)),
        isDirty: false,
        isTouched: false,
      };

      // Setup the state, and also setup the initialState in case we get a queue to reset
      this.state = { ...state };
      this.initialState = { ...state };

      // This is used for debouncing validate functions while typing
      this.debounceValidateTimer = null;

      // We collect fields if they aren't registered with the context above, and we manipulate them
      // that way.
      this.fields = {};
    }

    getChildContext() {
      return {
        registerField: this.register,
        unregisterField: this.unregister,
      };
    }

    componentDidMount() {
      // Register with the any higher component that needs to keep track of this field
      this.register();

      // Emulate the browser autoFocus if (1) requested and (2) possible
      if (this.props.autoFocus && this.fieldRef) {
        // Actually focus on the field
        this.fieldRef.focus();
        // Move the cursor to the end of the input if there is a value
        moveCursor(this.fieldRef);
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.fieldRef && this.fieldRef.selectionStart) {
        const { cursor } = this.state;
        if (typeof cursor !== 'undefined' && cursor !== prevState.cursor) {
          this.fieldRef.selectionStart = cursor;
          this.fieldRef.selectionEnd = cursor;
        }
      }
    }

    componentWillUnmount() {
      // Since we're unmounting, unregister from any higher components — this
      // means that the value will no longer be available
      this.unregister();
    }

    /** **************************************************************************
     * Registrations Methods
     *
     * Fields register with whatever controls them. So, if they are within a form,
     * the form can act on all of the fields (via bound functions passed by
     * context). This enables things like forms to get all the values for a submit
     * action or to pass all the values to determine if a slide should show, etc..
     *************************************************************************** */

    /**
     * Use the registration function passed by context
     * @return {void}
     */
    register = (fieldProps = null) => {
      if (!this.props.name) {
        console.log('NO NAME FIELD');
        // If there is no name, return early, and do not register with the form.
        return;
      }

      if (fieldProps && options.registerWrapped === false) {
        // This is where we intercept the fields and control them.
        this.fields[fieldProps.name] = fieldProps;
      } else if (isFunction(this.context.registerField)) {
        this.context.registerField({
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
    };

    /**
     * Use the unregistration function passed by context
     * @return {void}
     */
    unregister = name => {
      if (name) {
        // If this is called with a name, then that means a field is unregistering from this
        // composed field
        const { [name]: removed, ...rest } = this.fields;
        this.fields = rest;
      } else {
        if (!this.props.name) {
          // If there was no name, then we never registered.
          return;
        }
        if (isObject(this.context) && isFunction(this.context.unregisterField)) {
          this.context.unregisterField(this.props.name);
        }
      }
    };

    /**
     * Handlers
     */

    /* eslint-disable consistent-return */
    /**
     * Handles changes in value for the component
     *
     * Since, this handles all field types,
     *
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    onChange = event => {
      // We're allowing the pattern for composed fields to call "onChange" with just a value
      // so, we have to detect whether this method was called from an event that gives us
      // access to a DOMElement | DOMNode in event.target or if we're just getting an object
      // or a string...
      let value;
      if (event && event.target) {
        // If we have both event and event.target, check to see if event.target is a DOMElement
        // or DOMNode. If so, the value is just the value on the target (i.e. we're receiving)
        // information on a field primitive.
        if (event.target instanceof Element || event.target instanceof Node) {
          value = event.target.value; // eslint-disable-line
        } else {
          // If not, then the value contained "target" as a key, so the correct value is just the
          // entire object, or, inappropriately named here as "event"
          value = event;
        }
      } else if (event) {
        // If `target` is not on the object, then it's not a field primitive, and we should consider
        // that the entire value is just what is now poorly named as "event"
        value = event;
      }

      // const { value } = event.target;
      const { validateWhileTyping, validateDebounceTimeout } = this.props;

      if (this.props.type === 'checkbox') {
        // @todo clean this up
        const { checked } = event.target;
        return this.setValue(!!checked);
      }

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
        // @TODO consider removing this or doing something better (possible performance drain)
        if (!isEqual(this.state.value, values)) {
          this.setValue(values);
        }
      }

      if (this.state.value !== value) {
        // Only run the setState method if the value is actually different
        this.setValue(value);
      }
    };
    /* eslint-enable consistent-return */

    onClick = event => {
      const { target } = event;
      const { onClick } = this.props;
      if (isFunction(onClick)) {
        onClick(target);
      }
    };

    /**
     * Event Handlers
     */

    onFocus = event => {
      const { onFocus } = this.props;
      const { target } = event;

      // On most fields, add in a handler to prevent a form submit on enter
      // if (!['textarea', 'button', 'submit', 'reset'].includes(this.props.type)) {
      if (this.fieldRef) {
        this.fieldRef.addEventListener('keydown', this.handleKey, false);
      }

      // }

      // If this field has yet to be touched, then set it as touched
      if (this.state.isTouched === false) {
        this.setState(prevState => ({
          ...prevState,
          isTouched: true,
        }));
      }

      // Call user supplied function if given
      if (isFunction(onFocus)) {
        onFocus(target);
      }
    };

    onBlur = event => {
      const { onBlur, validate, asyncValidate } = this.props;
      const { target } = event;

      // if (!['textarea', 'button', 'submit', 'reset'].includes(this.props.type)) {
      if (this.fieldRef) {
        this.fieldRef.removeEventListener('keydown', this.handleKey);
      }

      // }

      if (asyncValidate && validate) {
        this.validate();
      }

      // Call user supplied function if given
      if (isFunction(onBlur)) {
        onBlur(target);
      }
    };

    /**
     * [preventSubmitOnEnter description]
     *
     * @todo maybe change the name of this function. Really, it's to prevent
     *       forms from submitting, but it can be used for other things. Maybe
     *       I can just wrap some generic keyHandlers.
     *
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleKey = event => {
      const { name, type, handleKeyPress } = this.props;
      const { handleKey, handleTab } = this.context;
      const { shiftKey, ctrlKey, altKey } = event;

      if (event.keyCode === ENTER) {
        if (!['textarea', 'button', 'submit', 'reset'].includes(type)) {
          event.preventDefault();
          if (isFunction(handleKey)) {
            handleKey(ENTER, { shiftKey, ctrlKey, altKey }, type, name, this.fieldRef);
          }
        }
      } else if (event.keyCode === TAB && handleTab) {
        event.preventDefault();
        if (isFunction(handleKey)) {
          handleKey(TAB, { shiftKey, ctrlKey, altKey }, type, name, this.fieldRef);
        }
      }

      // Let the user supplied function take over
      if (isFunction(handleKeyPress)) {
        handleKeyPress(event.keyCode, { shiftKey, ctrlKey, altKey }, type, name, this.fieldRef);
      }
    };

    /**
     * Refs
     */

    setRef = el => {
      this.fieldRef = el;

      const { setRef } = this.props;
      // If setRef was sent to to the component as a prop, then also call it with the element
      if (setRef && isFunction(setRef)) {
        setRef(el);
      }
    };

    getRef = () => this.fieldRef;

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
    getValue = () => this.unformat(this.state.value);

    /**
     * Set the value of the field
     *
     * This is a different method because (1) a bit of code reuse, but more importantly (2) the parent
     * a parent component might want to force update the value, hence, we provide a backdoor to the
     * setState method. This will be sent as part of the callback in the `register` method, so that
     * anything that this registers with shall have access to update the value.
     *
     * @todo  the
     *
     * @param {any} value the value to set
     */
    setValue = (value, resetErrors = false, resetTouched = false) => {
      const { name, onChange } = this.props;

      this.setState(prevState => {
        const formatted = this.format(value);

        let newValue = formatted;
        let cursor;

        if (Array.isArray(formatted)) {
          /* eslint-disable prefer-destructuring */
          newValue = formatted[0];
          cursor = formatted[1];
          /* eslint-enable prefer-destructuring */
        }

        // Call user supplied function if given
        if (isFunction(onChange)) {
          onChange(newValue, name);
        }

        return {
          ...prevState,
          cursor,
          errors: resetErrors === false ? prevState.errors : emptyArray,
          isDirty: newValue !== this.props.value,
          isTouched: resetTouched !== true,
          value: newValue,
        };
      });
    };

    reset = () => {
      // Clobber the state by setting back to the initialState
      this.setState(this.initialState);
      // If we were provided a change function, then call it with the initial value
      if (isFunction(this.props.onChange)) {
        this.props.onChange(this.initialState.value, this.props.name);
      }

      // If this is acting as a wrapper to compose fields, then call the reset on the fields it
      // controls
      Object.keys(this.fields).forEach(field => {
        if (isFunction(this.fields[field].reset)) {
          this.fields[field].reset();
        }
      });
    };

    /**
     * Validation and Errors
     */

    validate = () => {
      // We need to get the values of the controled fields and see if they're
      // good. Might be buggy.
      const controlledFields = Object.keys(this.fields)
        .reduce((acc, field) => {
          if (isFunction(this.fields[field].validate)) {
            return [...acc, this.fields[field].validate()];
          }
          return acc;
        }, [])
        .filter(valid => valid !== true);
      console.log('ControlledFields', this.props.name, controlledFields);
      return this.maybeUpdateErrors([...controlledFields, ...this.runValidations()]);
    };

    runValidations = () => runValidations(this.props.validate, this.state.value);

    isValid = () => !hasErrors(this.runValidations());

    wrappedRef = el => {
      this.ref = el;
    };

    /**
     * [maybeUpdateErrors description]
     *
     * @todo  remove return values
     *
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    maybeUpdateErrors = msg => {
      console.log(this.props.name, msg);
      if (msg === false) {
        if (this.state.errors.length !== 0) {
          this.setState(prevState => ({
            ...prevState,
            isValid: true,
            errors: emptyArray,
          }));
        }
        // This means it is valid, which is non-intuitive coming from a method with this name
        return true;
      }
      if (Array.isArray(msg) && msg.every(message => message === false)) {
        this.setState(prevState => ({
          ...prevState,
          isValid: true,
          errors: emptyArray,
        }));
        return true;
      }
      this.setState(prevState => ({
        ...prevState,
        isValid: false,
        errors: Array.isArray(msg) ? msg : [msg],
      }));
      // This means it is not valid, which is non-intuitive coming from a method with this name
      return false;
    };

    /**
     * Formatting
     */

    /**
     * Runs the value through a format function
     *
     * @todo  we might need to pass in more information here in order to deal with the formatters
     *        elegantly. Right now, for the google phone number example, pressing `backspace` on
     *        a delimter (eg, a paren surrounding an area code) returns the extact same string,
     *        but it should be deleting the last good number. Maybe we can get away with the
     *        onChange. Otherwise, we might have to do something else.
     *
     * @return {[type]} [description]
     */
    format = value => {
      const { format } = this.props;

      if (isFunction(format)) {
        if (this.fieldRef && this.fieldRef.selectionStart) {
          return format(value, this.fieldRef.selectionEnd);
        }
        return format(value);
      }

      return value;
    };

    unformat = value => {
      const { unformat } = this.props;

      if (isFunction(unformat)) {
        return unformat(value);
      }

      return value;
    };

    render() {
      // We are going to pull out the internal things that we need and call the rest `spreadProps`,
      // and then we'll, well, spread throse props over the component below it.
      const {
        onChange,
        onBlur,
        onFocus,
        registerWrapped,
        value,
        asyncValidate,
        validate,
        validateWhileTyping,
        validateDebounceTimeout,
        format,
        unformat,
        handleEnterKey,
        // children,
        ...spreadProps
      } = this.props;

      // If autocomplete is `off`, then it's most likely passed to the form as `off`, so by
      // recommendation of the spec, we're going to turn it off in the fields. But, since `off`
      // isn't actually supported by browsers anymore, we're instead going to generate random
      // strings and use those for the autocomplete value in order to confuse the browser's
      // autocomplete feature. It's the best we can do for now.
      // @see https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
      if (this.context.autoComplete === 'off') {
        spreadProps.autoComplete = Math.random()
          .toString(36)
          .slice(-5);
      } else if (this.props.autoComplete) {
        spreadProps.autoComplete = this.props.autoComplete;
      }

      return (
        <WrappedComponent
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClick={this.onClick}
          setRef={this.setRef}
          ref={this.wrappedRef}
          value={this.state.value}
          errors={this.state.errors}
          isValid={this.state.isValid}
          {...spreadProps}
        />
      );
    }
  };
}

export default asField;
