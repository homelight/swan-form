import * as React from 'react';

export type registerType = (payload: object) => void;
export type unregisterType = (name: string) => void;

export interface IAsFieldContext {
  registerWithField: registerType;
  unregisterFromField: unregisterType;
}

const AsFieldContext = React.createContext<IAsFieldContext>({
  // @ts-ignore
  registerWithField: payload => {},
  // @ts-ignore
  unregisterFromField: name => {},
});
AsFieldContext.Consumer.displayName = 'AsFieldConsumer';
AsFieldContext.Provider.displayName = 'AsFieldProvider';

export function withAsField<P extends IAsFieldContext>(Component: React.ComponentType<P>) {
  return function AsFieldComponent(props: { [key: string]: any }) {
    return (
      <AsFieldContext.Consumer>{asFieldProps => <Component {...props} {...asFieldProps} />}</AsFieldContext.Consumer>
    );
  };
}

export interface IFormContext {
  register: registerType;
  unregister: unregisterType;
  formAutoComplete: boolean;
  isFormSubmitting: boolean;
  hasFormSubmitted: boolean;
  formErrors: React.ReactNode[];
}

const FormContext = React.createContext<IFormContext>({
  // @ts-ignore
  register: payload => {},
  // @ts-ignore
  unregister: name => {},
  formAutoComplete: true,
  isFormSubmitting: false,
  hasFormSubmitted: false,
  formErrors: [],
});

FormContext.Consumer.displayName = 'FormConsumer';
FormContext.Provider.displayName = 'FormProvider';

export function withFormErrors<P extends { formErrors: React.ReactNode[] }>(Component: React.ComponentType<P>) {
  return function FormErrorComponent(props: { [key: string]: any }) {
    return (
      <FormContext.Consumer>
        {({ formErrors }) => <Component {...props} formErrors={formErrors} />}
      </FormContext.Consumer>
    );
  };
}

export function withForm<P extends { register: registerType; unregister: unregisterType }>(
  Component: React.ComponentType<P>,
) {
  return function FormComponent(props: { [key: string]: any }) {
    return (
      <FormContext.Consumer>
        {({ register, unregister }) => <Component {...props} register={register} unregister={unregister} />}
      </FormContext.Consumer>
    );
  };
}

export interface ISlideContext {
  registerWithSlide(payload: object): void;
  unregisterFromSlide(name: string): void;
}
const SlideContext = React.createContext<ISlideContext>({
  // @ts-ignore
  registerWithSlide: (payload: object) => {},
  // @ts-ignore
  unregisterFromSlide: (name: string) => {},
});

SlideContext.Consumer.displayName = 'SlideConsumer';
SlideContext.Provider.displayName = 'SlideProvider';

export function withSlide<P extends ISlideContext>(Component: React.ComponentType<P>) {
  return function SlideComponent(props: { [key: string]: any }) {
    return (
      <SlideContext.Consumer>{slideInterface => <Component {...props} {...slideInterface} />}</SlideContext.Consumer>
    );
  };
}

export { AsFieldContext, SlideContext, FormContext };
