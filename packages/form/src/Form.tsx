import * as React from 'react';
import { classes, gatherErrors, maybePromisify, execIfFunc, isDefined, FormContext } from '@swan-form/helpers';
import { memoize, isFunction } from 'lodash';
/**
 * Note, since the submit hooks rely on promises, and since promises are not cancelable,
 * we're wrapping handling them in checks to see if the component is mounted.
 * Facebook considers this an antipattern.
 *   (see https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)
 *
 * But, since this is a library, we don't want to change how promises work.
 */

export interface FormProps {
  name: string;
  onSubmit(values: { [key: string]: any }): Promise<{ [key: string]: any }>;

  beforeSubmit(values: { [key: string]: any }): Promise<{ [key: string]: any }>;
  afterSubmit(values: { [key: string]: any }): Promise<{ [key: string]: any }>;
  onError?(error: string | Error | React.ReactNode | React.ReactNode[]): void;
  autoComplete?: boolean;
  persist?: boolean;
  style?: React.CSSProperties;
  className?: string;
  noValidate?: boolean;
  defaultValues?: { [key: string]: any };
}

export interface FormState {
  isSubmitting: boolean;
  hasSubmitted: boolean;
  formErrors: React.ReactNode[];
}

export type RegisterType = {
  name: string;
  getValue(): void;
  setValue(value: any): void;
  reset(): void;
  validate(values: { [key: string]: any }, updateErrors: boolean): React.ReactNode[];
  focus(): void;
};

const emptyObject = {};
const emptyArray: any[] = [];

export class Form extends React.PureComponent<FormProps, FormState> {
  static defaultProps = {
    beforeSubmit: (values: { [key: string]: any } | Promise<{ [key: string]: any }>) => Promise.resolve(values),
    afterSubmit: (values: { [key: string]: any } | Promise<{ [key: string]: any }>) => Promise.resolve(values),
    // @ts-ignore
    onError: (error: string | Error | React.ReactNode | React.ReactNode[]) => {},
    noValidate: false,
    persist: false,
    autoComplete: true,
    style: emptyObject,
    defaultFormValues: {},
    formAutoComplete: true,
  };

  static displayName = 'Form';

  constructor(props: FormProps) {
    super(props);
    this.initialState = {
      isSubmitting: false,
      hasSubmitted: false,
      formErrors: emptyArray,
    };
    this.state = { ...this.initialState };

    this.getFormInterface = memoize(this.getFormInterface.bind(this));
    this.getSpreadProps = memoize(this.getSpreadProps.bind(this));
    this.formInterface = this.getFormInterface(this.state);
    this.mounted = false;
  }

  fields: { [key: string]: RegisterType } = {};
  persistedValues: { [key: string]: any } = {};
  mounted: boolean;
  initialState: FormState;
  formInterface: {
    defaultFormValues: { [key: string]: any };
    formAutoComplete: boolean;
    formErrors: any[];
    hasFormSubmitted: boolean;
    isFormSubmitting: boolean;
    registerWithForm(payload: any): void; // FIXME
    unregisterFromForm(name: string): void; // FIXME
  };

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getSpreadProps(noValidate: boolean) {
    return isDefined(noValidate) ? { noValidate } : emptyObject;
  }

  registerWithForm = (payload: RegisterType) => {
    // Save the field to the internal registry
    this.fields[payload.name] = payload;
    // If we are to persist the values, then we'll restore them if we see the field appear again
    if (this.props.persist) {
      const previousValue = this.persistedValues[payload.name];
      if (isDefined(previousValue)) {
        payload.setValue(previousValue);
      }
    }
  };

  // This is a function that we bind and memoize for renders. We feed `this.state` into it so that
  // the Context.Consumer will rerender.
  getFormInterface(state: FormState) {
    return {
      registerWithForm: this.registerWithForm,
      unregisterFromForm: this.unregisterFromForm,
      formAutoComplete: this.props.autoComplete!,
      hasFormSubmitted: state.hasSubmitted,
      isFormSubmitting: state.isSubmitting,
      formErrors: state.formErrors,
      defaultFormValues: this.props.defaultValues!,
      getFormValues: this.getValues,
    };
  }

  /**
   * Function for fields to unregister from the form
   */
  unregisterFromForm = (name: string) => {
    const { [name]: fieldInterface, ...rest } = this.fields;
    this.fields = rest;
    // Save the value if we have the persist prop
    if (this.props.persist) {
      this.persistedValues[name] = fieldInterface.getValue();
    }
  };

  /**
   * Function to get all the form values
   */
  getValues = () => {
    const values = Object.keys(this.fields).reduce(
      (values: { [key: string]: any }, key: string) => ({
        ...values,
        [key]: this.fields[key].getValue(),
      }),
      {},
    );

    return { ...this.persistedValues, ...values };
  };

  /**
   * Error handler for subbmit event
   */
  handleErrors = (errors: Error | React.ReactNode | React.ReactNode[]) => {
    const { onError } = this.props;
    // Force formErrors to be an array
    const formErrors = (Array.isArray(errors) ? errors : [errors]).filter(Boolean);
    // Persist the errors
    if (this.mounted) {
      this.setState({ formErrors });
    }
    // Call the supplied error handler
    execIfFunc(onError, ...formErrors);
  };

  /**
   * Reset handler for the form
   */
  onReset = (event: React.FormEvent) => {
    event.preventDefault();
    // Reset the state
    this.setState({ ...this.initialState });
    // Remove persisted values
    this.persistedValues = {};
    // Call the reset method on each field
    Object.keys(this.fields).forEach((key: string) => this.fields[key].reset());
  };

  /**
   * Submit handler
   */
  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.doSubmit();
  };

  /**
   * Called at the start of the submit event
   */
  handleBeforeSubmit = (values: object | Promise<{ [key: string]: any }>) => {
    const { beforeSubmit } = this.props;

    if (this.mounted) {
      this.setState({ isSubmitting: true });
    }

    return isFunction(beforeSubmit) ? maybePromisify(beforeSubmit(values)) : Promise.resolve(values);
  };

  /**
   * Called in the middle of the submit event
   */
  handleOnSubmit = (values: object | Promise<{ [key: string]: any }>) => {
    const { onSubmit } = this.props;
    return isFunction(onSubmit) ? maybePromisify(onSubmit(values)) : Promise.resolve(values);
  };

  /**
   * Called after a successful submit
   */
  handleAfterSubmit = (values: object | Promise<{ [key: string]: any }>) => {
    const { afterSubmit } = this.props;
    if (this.mounted) {
      this.setState({ isSubmitting: false, hasSubmitted: true });
    }
    return isFunction(afterSubmit) ? maybePromisify(afterSubmit(values)) : Promise.resolve(values);
  };

  /**
   * Checks validation and then runs the submit lifecycle
   */
  doSubmit = (): Promise<{ [key: string]: any } | string | Error> | void => {
    if (!this.validate()) {
      return this.handleErrors(['Form is not valid']);
    }

    this.setState({ isSubmitting: true, formErrors: [] });

    const values = this.getValues();

    return this.handleBeforeSubmit(values)
      .then(this.handleOnSubmit)
      .then(this.handleAfterSubmit)
      .catch(this.handleErrors);
  };

  /**
   * Runs validation on all current fields
   */
  validate = () => gatherErrors(this.fields, true).length === 0;

  render() {
    const { autoComplete, className, children, name, style = emptyObject } = this.props;
    return (
      <form
        {...this.getSpreadProps(this.props.noValidate!)}
        name={name}
        autoComplete={autoComplete ? 'on' : 'off'}
        onReset={this.onReset}
        onSubmit={this.onSubmit}
        className={classes('sf--form', className)}
        style={style}
      >
        <FormContext.Provider value={this.getFormInterface(this.state)}>{children}</FormContext.Provider>
      </form>
    );
  }
}

export default Form;
