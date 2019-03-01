import * as React from 'react';

import {
  AsFieldContext,
  canAccessSelectionStart,
  composeHOCs,
  execIfFunc,
  execOrMapFn,
  filterKeysFromObj,
  findValue,
  hasOwnProperty,
  identity,
  isDefined,
  isNull,
  maybeApply,
  moveCursor,
  withFormSlideField,
  alwaysFilteredArray,
  arraysAreEqual,
  isFunction,
} from '@swan-form/helpers';

export type RegisterType = {
  name: string;
  getValue(): void;
  setValue(value: any): void;
  reset(): void;
  validate(values: { [key: string]: any }, updateErrors: boolean): React.ReactNode[];
  focus(): void;
};

export interface AsFieldProps {
  name: string;
  type?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  defaultValue?: any;
  value?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  multiple?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateDebounceTimeout?: number;
  register?: boolean;
  format?(value: any, cursor: number | null): [any, number | null];
  unformat?(value: any): any;
  onBlur?(event: React.FocusEvent<any>): void;
  onChange?(event: React.ChangeEvent<any>): void;
  onKeyDown?(event: React.KeyboardEvent<any>): void;
  validate?:
    | ((value: any) => React.ReactNode | React.ReactNode[])
    | ((value: any) => React.ReactNode | React.ReactNode[])[];
  [key: string]: any;
}

export interface ContextProps {
  // From FormContext
  registerWithForm?(payload: RegisterType): void;
  unregisterFromForm?(name: string): void;
  formAutoComplete?: boolean;
  defaultFormValues: { [key: string]: any };

  // From SlideContext
  registerWithSlide?(payload: RegisterType): void;
  unregisterFromSlide?(name: string): void;
  advance?(event: React.KeyboardEvent<any>): void;
  retreat?(event: React.KeyboardEvent<any>): void;

  // From AsFieldContext
  registerWithField?(payload: RegisterType): void;
  unregisterFromField?(name: string): void;
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
  // 'hasFormSubmitted',
  // 'isFormSubmitting',
  'formErrors',
  'registerWithSlide',
  'unregisterFromSlide',
  'registerWithField',
  'unregisterFromField',
  'defaultFormValues',
  'register',
  'advance',
  'retreat',
  'getFormValues',
];

export interface InjectedProps {
  onBlur?(event: React.FocusEvent<any>): void;
  onChange(event: React.ChangeEvent<any>): void;
  setRef(el: any): void;
  autoComplete: string;
  errors: React.ReactNode[];
  value: any;
}

const rando = (chars: number = 6) =>
  Math.random()
    .toString(36)
    .slice(-chars);

const asField = <P extends AsFieldProps>(
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

      this.fieldInterface = {
        registerWithField: this.registerWithField,
        unregisterFromField: this.unregisterFromField,
      };
    }

    componentDidMount() {
      const { registerWithForm, name, registerWithSlide, registerWithField, autoFocus, type, register } = this.props;
      const { getValue, setValue, reset, validate, focus, getRef } = this;

      // If the `register` prop is set to false (defaults to true), then we register with any form or slide above
      // (i.e. we can halt a passthrough)
      if (register) {
        execIfFunc(registerWithForm, { name, getValue, setValue, reset, validate, focus, getRef });
        execIfFunc(registerWithSlide, { name, getValue, setValue, reset, validate, focus, getRef });
      }
      // Always register with fields that are above (i.e. there is always passthrough)
      execIfFunc(registerWithField, { name, getValue, setValue, reset, validate, focus, getRef });

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

    componentDidUpdate(_: any, prevState: AsFieldState) {
      // @ts-ignore
      if (!this.innerRef || !canAccessSelectionStart(this.props.type)) {
        return;
      }

      const { cursor } = this.state;
      if (cursor !== prevState.cursor && isDefined(cursor) && !isNull(cursor)) {
        // eslint-disable-next-line no-multi-assign
        this.innerRef.selectionStart = this.innerRef.selectionEnd = cursor;
      }
    }

    componentWillUnmount() {
      const { name, unregisterFromForm, unregisterFromSlide, unregisterFromField } = this.props;
      execOrMapFn([unregisterFromForm, unregisterFromSlide, unregisterFromField], name);
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
     * Registers sub-fields, passed as a prop through context
     */
    registerWithField = (payload: any) => {
      this.fields[payload.name] = { ...payload };
    };

    /**
     * Unregisters sub-fields, passed as a prop through context
     */
    unregisterFromField = (name: string) => {
      const { [name]: _, ...rest } = this.fields;
      this.fields = rest;
    };

    /**
     * Gets the unformatted value of the field
     */
    getValue = (): any => this.unformat(this.state.value);

    /**
     * Sets the value internally
     */
    setValue = (rawValue: any) => {
      const rawCursor = rawValue && hasOwnProperty(rawValue, 'length') ? rawValue.length : null;
      const [value, cursor] = this.format(rawValue, rawCursor);
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
      const { advance, onKeyDown, retreat, type } = this.props;

      // We need to persist the event if there is a callback handler for onKeyDown
      if (isFunction(onKeyDown)) {
        event && isFunction(event.persist) && event.persist();
      }

      // We need to handle onKeyDown for slides to prevent them from submitting. Instead,
      // we just advance / retreat to the next field / slide.
      if (event.key === 'Enter') {
        // @ts-ignore
        if (!['textarea', 'button', 'submit', 'reset'].includes(type)) {
          event.preventDefault();
        }
        execIfFunc(event.shiftKey ? retreat : advance, event);
      }

      // We want to call the event handler only after the slide handling has happened
      execIfFunc(onKeyDown, event);
    };

    /**
     * Generic change event for inner field
     */
    handleOnChange = (event: React.ChangeEvent<any>) => {
      event && isFunction(event.persist) && event.persist();
      const { checked, options, value } = event.target;
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
    format = (value: any, cursor: number | null = null): [any, number | null] =>
      maybeApply(this.props.format, value, cursor);

    /**
     * Removes formatting from value with a prop-supplied function
     */
    unformat = (value: any): any => maybeApply(this.props.unformat, value);

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

    fieldInterface: { registerWithField: (payload: any) => void; unregisterFromField: (name: string) => void };

    initialErrors: string[];

    initialValue: any;

    innerRef: any;

    validateDebounceTimer: number | undefined;

    dynamicHandlers: { [key: string]: Function };

    render() {
      const props = filterKeysFromObj(this.props, removeProps) as P & InjectedProps;
      const { autoComplete, formAutoComplete } = this.props;
      const { value } = this.state;

      const autoCompleteValue = findValue(
        autoComplete,
        isDefined(formAutoComplete) && !formAutoComplete ? this.autoComplete : '',
      );

      return (
        <AsFieldContext.Provider value={this.fieldInterface}>
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
            value={isDefined(value) && !isNull(value) ? value : ''}
          />
        </AsFieldContext.Provider>
      );
    }
  };
};

export { asField };
const Composed = composeHOCs<AsFieldProps>(asField, withFormSlideField);
export default Composed;
