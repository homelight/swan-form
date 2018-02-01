/* global document, window */
/* eslint-disable react/prop-types, react/sort-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

import autobind from '@flow-form/helpers/dist/autobind';
import runValidations from '@flow-form/helpers/dist/runValidations';
import noErrors from '@flow-form/helpers/dist/noErrors';
import hasErrors from '@flow-form/helpers/dist/hasErrors';
import noop from '@flow-form/helpers/dist/noop';
import moveCursorToEnd from '@flow-form/helpers/dist/moveCursor';
import { ENTER, TAB } from '@flow-form/helpers/dist/keyCodes';

function getInitialValue(props) {
  if (props.type === 'checkbox' && isObject(props)) {
    if (props.hasOwnProperty('checked')) {
      return !!props.checked;
    } else if (props.hasOwnProperty('defaultChecked')) {
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
 * @param  {Object} wrapperOptions   [description]
 * @return {[type]}                  [description]
 */
function asField(WrappedComponent, wrapperOptions = {}) {
  const asFieldWrapper = class extends Component {
    constructor(props) {
      super(props);

      // We'll cache this because it's used in a few places and should not change
      this.isMultipleSelect = props.type === 'select' && props.multiple === true;

      // Establish the initial state
      const state = {
        value: getInitialValue(props),
        errors: noErrors,
        isValid: !hasErrors(runValidations(props.validate, props.value)),
        isDirty: false,
        isTouched: false,
      };

      // Setup the state, and also setup the initialState in case we get a queue to reset
      this.state = { ...state };
      this.initialState = { ...state };

      // This is used for debouncing validate functions while typing
      this.debounceValidateTimer = null;

      autobind(this, [
        // Bind some handlers for use with events
        'onChange',
        'onClick',
        'onBlur',
        'onFocus',
        'setRef',
        'getRef',

        'register',
        'unregister',

        // Bind these so that parental compenents can use them
        'getValue',
        'setValue',
        // In case we need to reset the field
        'reset',
        'validate',
        'runValidations',
        'isValid',
        // 'preventSubmitOnEnter',
        'handleKey', // @TODO temp
      ]);
    }

    getChildContext() {
      // @todo figure out this registered wrapped thing
      if (wrapperOptions.registerWrapped !== false) {
        return {
          registerField: this.props.registerWrapped === true ? this.register : noop,
          unregisterField: this.props.registerWrapped === true ? this.unregister : noop,
          // autoComplete: this.context.autoComplete, // this might already be passed through
        };
      }
      // Pass through this context. The existence of this method somewhat messes with it.
      return this.context;
    }

    componentDidMount() {
      // Register with the any higher component that needs to keep track of this field
      this.register();

      // Emulate the browser autoFocus if (1) requested and (2) possible
      if (this.props.autoFocus && this.fieldRef) {
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

      if (this.props.type !== nextProps.type) {
        return true;
      }

      if (this.state.value !== nextState.value) {
        return true;
      }

      if (!isEqual(this.state.errors, nextState.errors)) {
        return true;
      }

      return false;
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
    register() {
      if (!this.props.name) {
        // If there is no name, return early, and do not register with the form.
        return;
      }
      if (isFunction(this.context.registerField) && wrapperOptions.registerWrapper !== false) {
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
    }

    /**
     * Use the unregistration function passed by context
     * @return {void}
     */
    unregister() {
      if (!this.props.name) {
        // If there was no name, then we never registered.
        return;
      }
      if (isObject(this.context) && isFunction(this.context.unregisterField)) {
        this.context.unregisterField(this.props.name);
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
      const { value } = event.target;
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
      } else if (this.state.value !== value) {
        // Only run the setState method if the value is actually different
        this.setValue(value);
      }
    }

    onClick(event) {
      const { target } = event;
      const { onClick } = this.props;
      if (isFunction(onClick)) {
        onClick(target);
      }
    }

    /**
     * Event Handlers
     */

    onFocus(event) {
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
    }

    onBlur(event) {
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
    }

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
    preventSubmitOnEnter(event) {
      const { target } = event;
      if (event.keyCode === ENTER) {
        event.preventDefault();
        if (isFunction(this.props.handleEnterKey)) {
          this.props.handleEnterKey(target);
        }
        if (isFunction(this.context.handleEnterKey)) {
          // Can be used by the `form` component to move through fields, or for other things
          this.context.handleEnterKey(target);
        }
      } else if (event.keyCode === TAB) {
        // Temporary. Consider passing a function in context or as a prop instead.
        event.preventDefault();
      }
    }

    // This is a temporary solution
    handleKey(event) {
      const { name, type } = this.props;
      const { handleKey, handleTab } = this.context;

      if (event.keyCode === ENTER) {
        if (!['textarea', 'button', 'submit', 'reset'].includes(type)) {
          event.preventDefault();
          if (isFunction(handleKey)) {
            handleKey(ENTER, type, name, this.fieldRef);
          }
        }
      } else if (event.keyCode === TAB && handleTab) {
        event.preventDefault();
        if (isFunction(handleKey)) {
          handleKey(TAB, type, name, this.fieldRef);
        }
      }
    }

    /**
     * Refs
     */

    setRef(el) {
      const { setRef } = this.props;
      // If setRef was sent to to the component as a prop, then also call it with the element
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
      return this.unformat(this.state.value);
    }

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
    setValue(value, resetErrors = false, resetTouched = false) {
      const { name, type, onChange } = this.props;

      this.setState(prevState => {
        const formatted = this.format(value);

        let newValue = formatted;
        let cursor;

        if (Array.isArray(formatted)) {
          const [val, cursor] = formatted;
          newValue = val;
        }

        // Call user supplied function if given
        if (isFunction(onChange)) {
          onChange(newValue, name);
        }

        return {
          ...prevState,
          cursor,
          errors: resetErrors === false ? prevState.errors : noErrors,
          isDirty: newValue !== this.props.value,
          isTouched: resetTouched !== true,
          value: newValue,
        };
      });
    }

    reset() {
      // Clobber the state by setting back to the initialState
      this.setState(this.initialState);
      // If we were provided a change function, then call it with the initial value
      if (isFunction(this.props.onChange)) {
        this.props.onChange(this.initialState.value, this.props.name);
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

    /**
     * [maybeUpdateErrors description]
     *
     * @todo  remove return values
     *
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    maybeUpdateErrors(msg) {
      if (msg === false) {
        if (this.state.errors.length !== 0) {
          this.setState(prevState => ({
            ...prevState,
            isValid: true,
            errors: noErrors,
          }));
        }
        // This means it is valid
        return true;
      }
      if (Array.isArray(msg) && msg.every(message => message === false)) {
        this.setState(prevState => ({
          ...prevState,
          isValid: true,
          errors: noErrors,
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
    format(value) {
      const { format } = this.props;

      if (isFunction(format)) {
        if (this.fieldRef && this.fieldRef.selectionStart) {
          const cursor = this.fieldRef.selectionEnd;
          return format(value, cursor);
        }
        return format(value);
      }

      return value;
    }

    unformat(value) {
      const { unformat } = this.props;

      if (isFunction(unformat)) {
        return unformat(value);
      }

      return value;
    }

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

      if (this.context.autoComplete === 'off') {
        // spreadProps.autoComplete = 'off';
        // This spoofs autocomplete so it at least won't try to autocomplete
        spreadProps.autoComplete = Math.random()
          .toString(36)
          .slice(-5);
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
      // if (spreadProps.autoComplete === 'off') {
      //   if (global && global.navigator && global.navigator.appVersion.includes('Chrome')) {
      //     spreadProps.autoComplete = 'nope';
      //   }
      // }

      return (
        <WrappedComponent
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClick={this.onClick}
          setRef={this.setRef}
          value={this.state.value}
          errors={this.state.errors}
          isValid={this.state.isValid}
          {...spreadProps}
        />
      );
    }
  };

  asFieldWrapper.displayName = `asField(${WrappedComponent.displayName || 'Component'})`;

  asFieldWrapper.propTypes = {
    registerWrapped: PropTypes.bool,
    /**
     * Number of ms to delay asyncValidation while typing
     * @type {Number}
     */
    validateDebounceTimeout: PropTypes.number,
  };

  asFieldWrapper.defaultProps = {
    registerWrapped: true,
    validateDebounceTimeout: 200,
  };

  asFieldWrapper.contextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
    handleKey: PropTypes.func, // @TODO temp
    handleTab: PropTypes.bool, // @TODO temp
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  asFieldWrapper.childContextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
    autoComplete: PropTypes.oneOf(['on', 'off']),
  };

  return asFieldWrapper;
}
export default asField;
