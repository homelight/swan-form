import * as React from 'react';

import {
  canAccessSelectionStart,
  composeHOCs,
  execIfFunc,
  execOrMapFn,
  filterKeysFromObj,
  findValue,
  identity,
  isDefined,
  isNull,
  maybeApply,
  getCursor,
  moveCursor,
  withFormSlide,
  alwaysFilteredArray,
  arraysAreEqual,
  isFunction,
} from '@swan-form/helpers';

/**
 * A registration contract for fields
 */
export type RegisterType = {
  /**
   * The `name` of the field; used to save the field value with forms / sliders
   */
  name: string;
  /**
   * A `getter` for the value
   */
  getValue: () => void;
  /**
   * A `setter` for the value
   */
  setValue: (value: any) => void;
  /**
   * A `setter` for the value to reset to the initial state
   */
  reset: () => void;
  /**
   * A validation function
   */
  validate: (values: { [key: string]: any }, updateErrors: boolean) => React.ReactNode[];
  /**
   * An interface to `focus` the field
   */
  focus: () => void;
};

export interface AsFieldProps {
  /**
   * The `name` of the field
   */
  name: string;
  /**
   * The type of field; these are used for the regular field types for inputs / textareas / selects
   */
  type?: string;
  /**
   * Whether or not to autofocus the field
   */
  autoFocus?: boolean;
  /**
   * The autocomplete type for the field
   */
  autoComplete?: string;
  /**
   * The default value of the field
   */
  defaultValue?: any;
  /**
   * The value of the field (this differs from defaultValue)
   */
  value?: any;
  /**
   * The defaultChecked state of the field (for toggles like checkboxes or radiobuttons)
   */
  defaultChecked?: boolean;
  /**
   * Whether or not the field is checked
   */
  checked?: boolean;
  /**
   * Whether or not the field accepts multiple values (for multi-selects and file inputs)
   */
  multiple?: boolean;
  /**
   * Run validations on the change event
   */
  validateOnChange?: boolean;
  /**
   * Run validations on the blur event
   */
  validateOnBlur?: boolean;
  /**
   * Change validations are debounced, control the debouncer timer with this
   */
  validateDebounceTimeout?: number;
  /**
   * Whether or not to register with parent forms / fields / slides
   */
  register?: boolean;
  /**
   * How to format the value
   */
  format?(value: any, cursor: number | null): [any, number | null];
  /**
   * How to unformat the value
   */
  unformat?(value: any): any;
  /**
   * onBlur event handler
   *
   * This is called after the library does what it needs to do internally for blur events
   */
  onBlur?(event: React.FocusEvent<any>): void;
  /**
   * onChange event handler
   *
   * This is called after the library does what it needs to do internally for change events
   */
  onChange?(event: React.ChangeEvent<any>): void;
  /**
   * onKeyDown event handler
   *
   * This is called after the library does what it needs to do internally for keydown events
   */
  onKeyDown?(event: React.KeyboardEvent<any>): void;
  /**
   * onKeyDown event handler specifically for the enter key
   *
   * This is called BEFORE any kind of internal library handling of keydown events, and will override any onKeyDown functions
   */
  onEnterKeyDown?(event: React.KeyboardEvent<any>): void;
  /**
   * A validate function or array of functions
   */
  validate?:
    | ((value: any) => React.ReactNode | React.ReactNode[])
    | ((value: any) => React.ReactNode | React.ReactNode[])[];
  /**
   * All other props will be passed down to the wrapped component
   */
  [key: string]: any;
}

export interface ContextProps {
  // From FormContext
  registerWithForm?(payload: RegisterType): void;
  unregisterFromForm?(name: string): void;
  formAutoComplete?: boolean;
  defaultFormValues?: { [key: string]: any };

  // From SlideContext
  registerWithSlide?: (payload: RegisterType) => void;
  unregisterFromSlide?: (name: string) => void;
  advance?: (event: React.KeyboardEvent<any>) => void;
  retreat?: (event: React.KeyboardEvent<any>) => void;
}

export interface AsFieldState {
  errors: React.ReactNode[];
  value: any;
  cursor?: number | null;
}

export interface AsFieldOptions {
  defaultFieldValue?: any;
  // fieldType?: string;
}

const emptyArray: any[] = [];

/**
 * Determines initial value for a field based on a few different props
 */
export const getInitialValue = <P extends AsFieldProps>(props: P & ContextProps, defaultFieldValue?: any) => {
  const { defaultValue, value, defaultChecked, checked, type, defaultFormValues = {} } = props;
  const { [props.name]: initialValue } = defaultFormValues;

  if (props.multiple) {
    findValue(value, initialValue, defaultValue, []);
  }

  switch (type) {
    case 'checkbox':
    case 'radio':
      return findValue(checked, initialValue, defaultChecked, false);
    case 'number':
      return findValue(value, initialValue, defaultValue, null);
    case 'select':
      return findValue(value, initialValue, defaultValue, props.multiple ? [] : '');
    default:
      return findValue(value, initialValue, defaultValue, defaultFieldValue);
  }
};

export const getDefaultOptions = (wrapperOptions: AsFieldOptions): AsFieldOptions => ({
  defaultFieldValue: '',
  // fieldType: 'unknown',
  ...wrapperOptions,
});

const removeProps = [
  'defaultValue',
  'defaultChecked',
  'registerWithForm',
  'unregisterFromForm',
  'format',
  'formAutoComplete',
  'unformat',
  'onBlur',
  'onChange',
  'validate',
  'validateOnBlur',
  'validateOnChange',
  'validateDebounceTimeout',
  'formErrors',
  'registerWithSlide',
  'unregisterFromSlide',
  'defaultFormValues',
  'register',
  'advance',
  'retreat',
  'getFormValues',
];

export interface InjectedProps {
  setValue: (value: any) => void;
  onBlur?: (event: React.FocusEvent<any>) => void;
  onChange: (event: React.ChangeEvent<any>) => void;
  setRef: (el: any) => void;
  autoComplete: string;
  errors: React.ReactNode[];
  value: any;
}

export interface Props {
  name: string;
  [key: string]: any;
}

const rando = (x: number = 6) =>
  Math.random()
    .toString(36)
    .slice(-x);

const asField = <P extends Props>(
  WrappedComponent: React.ComponentType<P & InjectedProps>,
  wrapperOptions: AsFieldOptions = {},
) => {
  const asFieldOptions = getDefaultOptions(wrapperOptions);

  return class AsField extends React.PureComponent<P & AsFieldProps & ContextProps, AsFieldState> {
    static defaultProps = {
      format: (value: any, cursor: number | null = null) => [value, cursor],
      unformat: identity,
      validateDebounceTimeout: 100,
      register: true,
    };

    static displayName = `AsField(${WrappedComponent.displayName || 'Component'})`;

    fields: { [key: string]: any } = {};

    constructor(props: P & ContextProps) {
      super(props);

      // Format the initial value if `this.format` is defined
      const processed = maybeApply(this.format, getInitialValue(props, asFieldOptions.defaultFieldValue), null);

      this.initialValue = Array.isArray(processed) ? processed[0] : processed;
      this.autoComplete = rando();

      this.state = { value: this.initialValue, errors: [] };
    }

    componentDidMount() {
      const { registerWithForm, name, registerWithSlide, autoFocus, type, register } = this.props;
      const { getValue, setValue, reset, validate, focus, getRef } = this;

      const fieldInterface = { name, getValue, setValue, reset, validate, focus, getRef };
      // If the `register` prop is set to false (defaults to true), then we register with any form or slide above
      // (i.e. we can halt a passthrough)
      if (register) {
        execOrMapFn([registerWithForm, registerWithSlide], fieldInterface);
      }

      // Emulate the browser autoFocus if (1) requested and (2) possible
      if (!autoFocus || !this.innerRef) {
        return;
      }

      // Actually focus on the field
      this.innerRef.focus();
      // Safari will freak out if we try to access selectionStart on an input` with many different types.
      // @ts-ignore
      if (canAccessSelectionStart(type)) {
        moveCursor(this.innerRef);
      }
    }

    componentDidUpdate(prevProps: any, prevState: AsFieldState) {
      const { value } = prevProps;

      // First, if this component is being controlled by another component, then update the
      // internal state when the `value` prop changes.
      if (value !== this.props.value && value !== this.state.value) {
        this.setValue(this.props.value);
        return;
      }

      // Check if we can access selection start to move the cursor
      if (!this.innerRef || !canAccessSelectionStart(this.props.type)) {
        return;
      }

      // Move the cursor
      const { cursor } = this.state;
      if (cursor !== prevState.cursor && isDefined(cursor) && !isNull(cursor)) {
        // eslint-disable-next-line no-multi-assign
        this.innerRef.selectionStart = this.innerRef.selectionEnd = cursor;
      }
    }

    componentWillUnmount() {
      const { name, register, unregisterFromForm, unregisterFromSlide } = this.props;

      // If we didn't register, then don't unregister
      if (register) {
        execOrMapFn([unregisterFromForm, unregisterFromSlide], name);
      }
    }

    /**
     * These are props (event handlers) that are passed down only if the user supplies certain props
     */
    getMaybeProps = () => {
      const { onBlur, validateOnBlur } = this.props;
      const out: { [key: string]: (event: any) => void } = {};

      if (isFunction(onBlur) || validateOnBlur) {
        out.onBlur = this.handleOnBlur;
      }

      return out;
    };

    /**
     * Gets the unformatted value of the field
     */
    getValue = (): any => this.unformat(this.state.value);

    /**
     * Sets the value internally
     */
    setValue = (rawValue: any) => {
      const [value, cursor] = this.format(rawValue, getCursor(this.innerRef));
      this.setState({ value, cursor });
    };

    getRef = () => this.innerRef;

    /**
     * Resets field to initial state
     */
    reset = () => {
      this.setState({ value: this.initialValue, errors: emptyArray });

      // If this is acting as a wrapper to compose fields, then call the reset wrapped fields
      const { fields } = this;
      Object.keys(fields).forEach(field => execIfFunc(fields[field].reset));
    };

    /**
     * Convenience function to determine if something is a multiselect
     */
    isMultiSelect = () => this.props.type === 'select' && this.props.multiple;

    /**
     * Handles onKeyDown
     *
     * This is needed so that we prevent the default mechanism for forms to auto-submit if
     * `ENTER` is pressed while we're in a slide, so we have looser coupling.
     */
    handleOnKeyDown = (event: React.KeyboardEvent<any>) => {
      const { advance, onKeyDown, onEnterKeyDown, retreat, type } = this.props;

      // We need to persist the event if there is a callback handler for onKeyDown
      if (isFunction(onKeyDown)) {
        // eslint-disable-next-line
        event && isFunction(event.persist) && event.persist();
      }

      if (event.key === 'Enter') {
        // @ts-ignore
        if (!['textarea', 'button', 'submit', 'reset'].includes(type)) {
          event.preventDefault();
        }

        if (!isDefined(onEnterKeyDown)) {
          // We need to handle onKeyDown for slides to prevent them from submitting. Instead,
          // we just advance / retreat to the next field / slide.
          execIfFunc(event.shiftKey ? retreat : advance, event);
          // We want to call the event handler only after the slide handling has happened
          execIfFunc(onKeyDown, event);
        } else {
          execIfFunc(onKeyDown, event);
          // We want to call the event handler only after the slide handling has happened
          execIfFunc(event.shiftKey ? retreat : advance, event);
        }
      }
    };

    /**
     * Generic change event for inner field
     */
    handleOnChange = (event: React.ChangeEvent<any>) => {
      // eslint-disable-next-line
      event && isFunction(event.persist) && event.persist();
      const { checked, options, value, files } = event.target;
      const { validateOnChange, validateDebounceTimeout, type, onChange } = this.props;

      // Handle checkboxes and radio buttons early and exit
      if (type === 'checkbox' || type === 'radio') {
        this.setState({ value: checked });
        // Call any user supplied callbacks
        execIfFunc(onChange, event);

        if (validateOnChange) {
          this.validate(checked, true);
        }

        return;
      }

      if (type === 'file') {
        this.setState({ value: files });

        // Call any user supplied callbacks
        execIfFunc(onChange, event);

        if (validateOnChange) {
          this.validate(checked, true);
        }

        return;
      }

      // Handle multiselects early and exit
      if (this.isMultiSelect()) {
        const values = [];
        for (let i = 0; i < options.length; i++) {
          // Grab all the options that are selected
          if (options[i].selected) {
            values.push(options[i].value);
          }
        }
        // Only update the state value if the arrays are actually different
        if (!arraysAreEqual(this.state.value, values)) {
          this.setValue(values);
        }
        this.setState({ value: values });
        // Call any user supplied callbacks
        execIfFunc(onChange, event);
        return;
      }

      // Grab the cursor position from the field ref
      const cursor =
        // @ts-ignore
        this.innerRef && canAccessSelectionStart(type) && 'selectionStart' in this.innerRef
          ? this.innerRef.selectionStart
          : null;

      // Apply the formatter. This is an identity function if there is no user supplied formatter
      const [newValue, newCursor] = this.format(value, cursor);

      // If we are to validate onChange, then we'll debounce the call
      if (validateOnChange) {
        window.clearTimeout(this.validateDebounceTimer);
        this.validateDebounceTimer = setTimeout(() => this.validate(newValue, true), validateDebounceTimeout);
      }

      // Update internal state
      this.setState({ value: newValue, cursor: isDefined(newCursor) ? newCursor : cursor });

      // Call any user supplied callbacks
      execIfFunc(onChange, event);
    };

    /**
     * Generic blur handler for user-supplied callback, also does validation based on validateOnBlur
     */
    handleOnBlur = (event: React.FocusEvent<any>) => {
      const { onBlur, validateOnBlur } = this.props;
      // eslint-disable-next-line
      event && isFunction(event.persist) && event.persist();

      if (validateOnBlur) {
        this.validate(event.target.value, true);
      }

      execIfFunc(onBlur, event);
    };

    /**
     * Proxy function to focus on inner field
     */
    focus = () => {
      if (this.innerRef && isFunction(this.innerRef.focus)) {
        this.innerRef.focus();
      }
    };

    /**
     * Formats a value according to prop-supplied function
     */
    format = (value: any, cursor: number | null = null): [any, number | null] => {
      const { format } = this.props;
      return maybeApply(format, value, cursor);
    };

    /**
     * Removes formatting from value with a prop-supplied function
     */
    unformat = (value: any): any => {
      const { unformat } = this.props;
      return maybeApply(unformat, value);
    };

    /**
     * Validates a field based on prop-supplied function
     *
     * @todo find a pattern to support asynchronous validations
     */
    validate = (value: any, updateErrors: boolean = false): React.ReactNode[] => {
      const { validate } = this.props;

      // Validate the unformated
      const errors = alwaysFilteredArray<React.ReactNode>(execOrMapFn(validate, this.unformat(value)));

      if (updateErrors) {
        this.setState({ errors });
      }
      return errors.length === 0 ? emptyArray : errors;
    };

    /**
     * Determines if a field is valid according to prop-supplied function
     */
    isValid = () => this.validate(this.getValue()).length === 0;

    /**
     * Prop passed to inner component to set the ref
     */
    setRef = (el: any) => {
      const { setRef } = this.props;

      this.innerRef = el;

      // If we were passed a `setRef` function, then we should call it
      execIfFunc(setRef, el);
    };

    autoComplete: string;

    initialErrors: string[];

    initialValue: any;

    innerRef: any;

    validateDebounceTimer: number | undefined;

    dynamicHandlers: { [key: string]: Function };

    render() {
      const props = filterKeysFromObj(this.props, removeProps) as P & InjectedProps;
      const { autoComplete, formAutoComplete, value: propValue } = this.props;
      const { value } = this.state;

      const inputValue = isDefined(propValue) ? propValue : isDefined(value) && !isNull(value) ? value : '';

      const autoCompleteValue = findValue(
        autoComplete,
        isDefined(formAutoComplete) && !formAutoComplete ? this.autoComplete : '',
      );

      return (
        <WrappedComponent
          {...props}
          {...this.getMaybeProps()}
          {...this.dynamicHandlers}
          {...(autoComplete ? { autoComplete: autoCompleteValue } : {})}
          errors={this.state.errors}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          setRef={this.setRef}
          setValue={this.setValue}
          value={inputValue}
        />
      );
    }
  };
};

// export { asField, AsFieldContext };
const Composed = composeHOCs<Props>(asField, withFormSlide);
export { Composed as asField };
export default Composed;
