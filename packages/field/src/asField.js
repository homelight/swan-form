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
  runValidations,
} from '@swan-form/helpers';

const { ENTER, TAB } = keyCodes;

function getInitialValue(props) {
  if (props.type === 'checkbox' && isObject(props)) {
    if (hasOwnProperty(props, 'checked')) {
      return !!props.checked;
    }

    if (hasOwnProperty(props, 'defaultChecked')) {
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

function canAccessSelectionStart(type) {
  return ['text', 'search', 'password', 'tel', 'url'].includes(type);
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
function asField(WrappedComponent, wrapperOptions = {}) {
  return class extends PureComponent {
    static displayName = `asField(${WrappedComponent.displayName || 'Component'})`;

    static propTypes = {
      registerWrapped: PropTypes.bool,
      /**
       * Number of ms to delay asyncValidation while typing
       * @type {Number}
       */
      validateDebounceTimeout: PropTypes.number,
      doNotRegister: PropTypes.bool,
      name: PropTypes.string.isRequired,
    };

    static defaultProps = {
      registerWrapped: true,
      validateDebounceTimeout: 200,
      doNotRegister: false,
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

      // If autocomplete is `off`, then it's most likely passed to the form as `off`, so by
      // recommendation of the spec, we're going to turn it off in the fields. But, since `off`
      // isn't actually supported by browsers anymore, we're instead going to generate random
      // strings and use those for the autocomplete value in order to confuse the browser's
      // autocomplete feature. It's the best we can do for now.
      // @see https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
      // In order to make this play well with PureComponents, we're just going to cache the random
      // value so it doesn't change every render. We'll use this only if context is set to `off`
      this.autoComplete = Math.random()
        .toString(36)
        .slice(-5);

      this.mounted = false;
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
        // Safari will freak out if we try to access selectionStart on an `<input/>` with many different
        // `types` set.
        if (canAccessSelectionStart(this.props.type)) {
          moveCursor(this.fieldRef);
        }
      }

      this.mounted = true;
    }

    componentDidUpdate(prevProps, prevState) {
      // Safari will freak out if we try to access selectionStart on an `<input/>` with many different
      // `types` set.
      if (!canAccessSelectionStart(this.props.type)) {
        return;
      }
      // This isn't working correctly for everything
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
      this.mounted = false;
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
      const { name, doNotRegister } = this.props;
      if (fieldProps && wrapperOptions.registerWrapped === false) {
        // This is where we intercept the fields and control them.
        this.fields[fieldProps.name] = fieldProps;
        // Note, if there is no name field, then we don't register with anything in context
      } else if (name && isFunction(this.context.registerField) && !doNotRegister) {
        this.context.registerField({
          // This should be a unique key
          name,
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
        if (!this.props.name || this.props.doNotRegister) {
          // We never registered
          return;
        }
        // Unregister this field itself
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

    /**
     * An onFocus handler that can be user defined.
     *
     * By default, it maybe binds a fundtion to keyDown to prevent accidental form submission.
     *
     * If you're using this wrapper to compose a field out of other FF fields, then you can use this
     * function as a prop and pass it to all the fields that are relevant if you want to supply
     * a function as a prop.
     *
     */
    onFocus = event => {
      const { onFocus } = this.props;
      const { target } = event;

      // On most fields, add in a handler to prevent a form submit on enter
      if (this.fieldRef) {
        this.fieldRef.addEventListener('keydown', this.handleKey, false);
      }

      // If this field has yet to be touched, then set it as touched
      if (this.state.isTouched === false && this.mounted) {
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

    /**
     * Blur handler that provides some async validation (if specified) and removes event listeners
     * that are created in onFocus
     */
    onBlur = event => {
      const { onBlur, validate, asyncValidate } = this.props;
      const { target } = event;

      if (this.fieldRef) {
        this.fieldRef.removeEventListener('keydown', this.handleKey);
      }

      if (asyncValidate && validate) {
        this.validate();
      }

      // Call user supplied function if given
      if (isFunction(onBlur)) {
        onBlur(target);
      }
    };

    /**
     * [handleKey description]
     *
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handleKey = event => {
      const { name, type, handleKeyPress } = this.props;
      const { handleKey, handleTab } = this.context;
      const { shiftKey, ctrlKey, altKey } = event;

      if (event.keyCode === ENTER) {
        // Allow the enter key to function normally on textareas, buttons, submits, and resets.
        // Otherwise, intercept (likely, this is wrapped in a form, and it will make the form
        // submit). Note: we intercept only if there is a function in context
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
     * If you're composing fields with this wrapper, then the best practice is to call the onChange
     * method from the wrapped component.
     *
     * @param {any} value the value to set
     */
    setValue = (value, resetErrors = false, resetTouched = false) => {
      if (this.mounted) {
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
      }
    };

    /**
     * Reset method called by `reset` buttons to restore the field to its initialState
     *
     */
    reset = () => {
      if (this.mounted) {
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
      }
    };

    /**
     * Validation and Errors
     */

    validate = () => {
      if (!this.mounted) {
        return false;
      }
      // We need to get the values of the controlled fields and see if they're
      // good. Might be buggy.
      const controlledFields = Object.keys(this.fields)
        .reduce(
          (acc, field) =>
            isFunction(this.fields[field].validate) ? [...acc, this.fields[field].validate()] : acc,
          [],
        )
        // This filter is ugly... It sort of mixes concerns and shows how we're repurposing the
        // method.
        .filter(valid => valid !== true);
      return this.maybeUpdateErrors([...controlledFields, ...this.runValidations()]);
    };

    runValidations = () => runValidations(this.props.validate, this.state.value);

    // @todo update this to be aware of controlled fields, or merge it with the other validation
    // functions
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

      // Safari will freak out if we try to access selectionStart on an `<input/>` with many different
      // `types` set.
      if (!canAccessSelectionStart(this.props.type)) {
        return value;
      }

      // If the user has specified a formatter, then call it on the value
      if (isFunction(format)) {
        // If we have a fieldRef and the fieldRef supports selectionStart, then we'll
        // do automated cursor management.
        if (this.fieldRef && this.fieldRef.selectionStart) {
          return format(value, this.fieldRef.selectionEnd);
        }
        // Otherwise, just call with the value
        return format(value);
      }

      // If not formatting function is supplied, then return the raw value
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
        doNotRegister,
        ...spreadProps
      } = this.props;

      if (this.context.autoComplete === 'off') {
        spreadProps.autoComplete = this.autoComplete;
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
          getValue={this.getValue}
          setValue={this.setValue}
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
