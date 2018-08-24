import * as React from 'react';
import { isFunction, isEqual } from 'lodash';

import {
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
  AsFieldContext,
  withAsField,
  withForm,
  withSlide,
} from '@swan-form/helpers';

const emptyArray: any[] = [];

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
  validateDebounceTimeout?: boolean;
  format?(value: any, cursor: number | null): [any, number | null];
  unformat?(value: any): any;
  onBlur?(event: React.FocusEvent<any>): void;
  onFocus?(event: React.FocusEvent<any>): void;
  onClick?(event: React.MouseEvent<any>): void;
  onChange?(event: React.ChangeEvent<any>): void;
  validate?:
    | ((value: any) => React.ReactNode | React.ReactNode[])
    | ((value: any) => React.ReactNode | React.ReactNode[])[];
}

export interface ContextProps {
  // From FormContext
  registerWithForm?(payload: any): void;
  unregisterFromForm?(payload: any): void;
  formAutoComplete?: boolean;
  defaultFormValues: { [key: string]: any };

  onKeyDown?(event: React.KeyboardEvent<any>): void;

  // From SlideContext
  registerWithSlide?(payload: any): void;
  unregisterFromSlide?(name: string): void;
}

export interface WrapperProps extends ContextProps {
  doNotRegister?: boolean;
  [key: string]: any;
}

export interface AsFieldState {
  errors: React.ReactNode[];
  value: any;
  cursor?: number | null;
}

/**
 * Determines initial value for a field based on a few different props
 */
const getInitialValue = <P extends AsFieldProps>(props: P & ContextProps) => {
  const { defaultValue, value, defaultChecked, checked, type, defaultFormValues = {} } = props;
  const { [props.name]: initialValue } = defaultFormValues;

  if (props.multiple) {
    findValue(value, initialValue, defaultValue, []);
  }

  switch (type) {
    case 'checkbox':
      return findValue(!!checked, !!initialValue, !!defaultChecked, false);
    case 'number':
      return findValue(value, initialValue, defaultValue, null);
    case 'select':
      return findValue(value, initialValue, defaultValue, props.multiple ? [] : '');
    default:
      return findValue(value, initialValue, defaultValue, '');
  }
};

const removeProps = [
  'defaultValue',
  'registerWithForm',
  'unregisterFromForm',
  'format',
  'formAutoComplete',
  'unformat',
  'onFocus',
  'onBlur',
  'onChange',
  'onClick',
  'validate',
  'validateOnBlur',
  'validateOnChange',
  'validateDebounceTimeout',
  'hasFormSubmitted',
  'isFormSubmitting',
  'formErrors',
  'registerWithSlide',
  'unregisterFromSlide',
  'registerWithField',
  'unregisterFromField',
];

export interface InjectedProps {
  onBlur(event: React.FocusEvent<any>): void;
  onFocus(event: React.FocusEvent<any>): void;
  onChange(event: React.ChangeEvent<any>): void;
  onClick(event: React.MouseEvent<any>): void;
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
  // options = {},
) => {
  return class AsField extends React.PureComponent<P & AsFieldProps & ContextProps, AsFieldState> {
    constructor(props: P & ContextProps) {
      super(props);

      const processed = maybeApply(this.format, getInitialValue(props), null);
      this.initialValue = Array.isArray(processed) ? processed[0] : processed;
      this.autoComplete = rando();
      this.state = {
        value: this.initialValue,
        errors: [],
      };
      this.fieldInterface = {
        registerWithField: this.register,
        unregisterFromField: this.unregister,
      };
    }

    static defaultProps = {
      format: (value: any, cursor: number | null = null) => [value, cursor],
      unformat: identity,
      validateDebounceTimeout: 100,
    };

    autoComplete: string;
    fieldInterface: {
      registerWithField: (payload: any) => void;
      unregisterFromField: (name: string) => void;
    };
    fields: { [key: string]: any } = {};
    initialErrors: string[];
    initialValue: any;
    innerRef: any;
    validateDebounceTimer: number | undefined;

    componentDidMount() {
      const { registerWithForm, name, registerWithSlide, autoFocus, type } = this.props;
      const { getValue, setValue, reset, validate, focus } = this;
      execIfFunc(registerWithForm, { name, getValue, setValue, reset, validate, focus });
      execIfFunc(registerWithSlide, { name, getValue, setValue, reset, validate, focus });

      if (!autoFocus || !this.innerRef) {
        return;
      }
      // Emulate the browser autoFocus if (1) requested and (2) possible

      // Actually focus on the field
      this.innerRef.focus();
      // Safari will freak out if we try to access selectionStart on an input` with many different types.
      if (canAccessSelectionStart(type!)) {
        moveCursor(this.innerRef);
      }
    }

    componentDidUpdate(_: any, prevState: AsFieldState) {
      if (!this.innerRef || !canAccessSelectionStart(this.props.type!)) {
        return;
      }

      const { cursor } = this.state;
      if (cursor !== prevState.cursor && isDefined(cursor) && !isNull(cursor)) {
        this.innerRef.selectionStart = this.innerRef.selectionEnd = cursor;
      }
    }

    componentWillUnmount() {
      const { name, unregisterFromForm, unregisterFromSlide } = this.props;
      execOrMapFn([unregisterFromForm, unregisterFromSlide], name);
    }

    /**
     * Registers sub-fields, passed as a prop through context
     */
    register = (payload: any) => {
      this.fields[payload.name] = { ...payload };
    };

    /**
     * Unregisters sub-fields, passed as a prop through context
     */
    unregister = (name: string) => {
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

    /**
     * Resets field to initial state
     */
    reset = () => {
      this.setState({ value: this.initialValue, errors: emptyArray });

      // If this is acting as a wrapper to compose fields, then call the reset wrapped fields
      const { fields } = this;
      Object.keys(fields).forEach(field => execIfFunc(fields[field].reset));
    };

    handleOnKeyDown = (event: React.KeyboardEvent<any>) => {
      event.persist();
      maybeApply(this.props.onKeyDown, event);
    };

    /**
     * Convenience function to determine if something is a multiselect
     */
    isMultiSelect = () => this.props.type === 'select' && this.props.multiple;

    /**
     * Generic change event for inner field
     */
    handleOnChange = (event: React.ChangeEvent<any>) => {
      event.persist();
      const { checked, options, value } = event.target;
      const { validateOnChange, validateDebounceTimeout, type, onChange } = this.props;

      // Handle checkboxes and radio buttons early and exit
      if (type === 'checkbox' || type === 'radio') {
        this.setState({ value: checked });
        execIfFunc(onChange, event);
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
        if (!isEqual(this.state.value, values)) {
          this.setValue(values);
        }
        this.setState({ value: values });
        execIfFunc(onChange, event);
        return;
      }

      const cursor =
        this.innerRef && canAccessSelectionStart(type!) && 'selectionStart' in this.innerRef
          ? this.innerRef.selectionStart
          : null;

      const processed = maybeApply(this.format, value, cursor);
      const newValue = Array.isArray(processed) ? processed[0] : processed;
      const newCursor = Array.isArray(processed) ? processed[1] : cursor;

      if (validateOnChange) {
        window.clearTimeout(this.validateDebounceTimer);
        this.validateDebounceTimer = setTimeout(() => this.validate(newValue, true), validateDebounceTimeout);
      }

      this.setState({
        value: newValue,
        cursor: newCursor,
      });

      execIfFunc(onChange, event);
    };

    /**
     * Generic focus handler for user-supplied callback
     */
    handleOnFocus = (event: React.FocusEvent<any>) => {
      const { onFocus } = this.props;
      if (isFunction(onFocus)) {
        event.persist();
        onFocus(event);
      }
    };

    /**
     * Generic blur handler for user-supplied callback, also does validation based on validateOnBlur
     */
    handleOnBlur = (event: React.FocusEvent<any>) => {
      const { onBlur, validateOnBlur } = this.props;
      event.persist();

      if (validateOnBlur) {
        this.validate(event.target.value, true);
      }

      if (isFunction(onBlur)) {
        onBlur(event);
      }
    };

    /**
     * Generic click handler for user-supplied callback
     */
    handleOnClick = (event: React.MouseEvent<any>) => {
      const { onClick } = this.props;
      if (isFunction(onClick)) {
        event.persist();
        onClick(event);
      }
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
     */
    validate = (value: any, updateErrors: boolean = false): React.ReactNode[] => {
      const { validate } = this.props;

      const initial = execOrMapFn(validate, value) as React.ReactNode | React.ReactNode[];
      const errors = Array.isArray(initial) ? initial.filter(Boolean) : [initial].filter(Boolean);
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
      this.innerRef = el;
    };

    render() {
      const props = filterKeysFromObj(removeProps, this.props) as P & InjectedProps;
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
            autoComplete={autoCompleteValue}
            errors={this.state.errors}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onClick={this.handleOnClick}
            onChange={this.handleOnChange}
            value={isDefined(value) && !isNull(value) ? value : ''}
            setRef={this.setRef}
          />
        </AsFieldContext.Provider>
      );
    }
  };
};

export { asField, AsFieldContext };
const Composed = composeHOCs<AsFieldProps>(asField, withAsField, withSlide, withForm);
export default Composed;
