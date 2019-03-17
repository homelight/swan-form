// Note: https://github.com/Microsoft/TypeScript/issues/28938 breaks typing hocs well
import * as React from 'react';

const noop = () => {};

export type registerType = (payload: object) => void;
export type unregisterType = (name: string) => void;

export interface IAsFieldContext {
  registerWithField: registerType;
  unregisterFromField: unregisterType;
}

type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

export const AsFieldContext = React.createContext<IAsFieldContext>({
  // @ts-ignore
  registerWithField: noop,
  // @ts-ignore
  unregisterFromField: noop,
});
// @ts-ignore
AsFieldContext.displayName = 'AsFieldContext';

export function withAsField<P extends IAsFieldContext>(Component: React.ComponentType<P>) {
  // eslint-disable-next-line no-param-reassign
  Component.displayName = 'withAsField';
  return function AsFieldComponent(props: P) {
    return (
      <AsFieldContext.Consumer>{asFieldProps => <Component {...props} {...asFieldProps} />}</AsFieldContext.Consumer>
    );
  };
}

export interface IFormContext {
  registerWithForm: registerType;
  unregisterFromForm: unregisterType;
  formAutoComplete: boolean;
  isFormSubmitting: boolean;
  hasFormSubmitted: boolean;
  defaultFormValues: { [key: string]: any };
  formErrors: React.ReactNode[];
}

export const FormContext = React.createContext<IFormContext>({
  // @ts-ignore
  registerWithForm: noop,
  // @ts-ignore
  unregisterFromForm: noop,
  formAutoComplete: true,
  isFormSubmitting: false,
  hasFormSubmitted: false,
  defaultFormValues: {},
  formErrors: [],
});

// @ts-ignore
FormContext.displayName = 'FormContext';

// function hoc<P extends Props>(Component: ComponentType<P>): ComponentType<Omit<P, keyof Props>> {

export interface FormErrors {
  formErrors: React.ReactNode[];
}

export interface StringObject {
  [key: string]: any;
}

export function withFormErrors<P extends FormErrors>(
  Component: React.ComponentType<P>,
): React.ComponentType<Omit<P, keyof FormErrors>> {
  // eslint-disable-next-line no-param-reassign
  Component.displayName = 'withFormErrors';
  // @todo so, P works here, but that means that we'd have to pass the formErrors object each time,
  // which COMPLETELY defeats the damn purpose.
  return function FormErrorComponent(props: P) {
    return (
      <FormContext.Consumer>
        {({ formErrors }) => <Component {...props} formErrors={formErrors} />}
      </FormContext.Consumer>
    );
  };
}

export function withForm<
  P extends {
    registerWithForm: registerType;
    unregisterFromForm: unregisterType;
    formAutoComplete: boolean;
    defaultFormValues: { [key: string]: any };
  }
>(Component: React.ComponentType<P>) {
  return function FormComponent(props: P) {
    // eslint-disable-next-line no-param-reassign
    Component.displayName = 'withForm';
    return (
      <FormContext.Consumer>
        {({ registerWithForm, unregisterFromForm, formAutoComplete, defaultFormValues }) => (
          <Component
            {...props}
            registerWithForm={registerWithForm}
            unregisterFromForm={unregisterFromForm}
            formAutoComplete={formAutoComplete}
            defaultFormValues={defaultFormValues}
          />
        )}
      </FormContext.Consumer>
    );
  };
}

export interface ISlideContext {
  registerWithSlide: (payload: object) => void;
  unregisterFromSlide: (name: string) => void;
}
export const SlideContext = React.createContext<ISlideContext>({
  // @ts-ignore
  registerWithSlide: noop,
  // @ts-ignore
  unregisterFromSlide: noop,
});

SlideContext.displayName = 'SlideContext';

export function withSlide<P extends ISlideContext>(Component: React.ComponentType<P>) {
  // eslint-disable-next-line no-param-reassign
  Component.displayName = 'withSlide';
  return function SlideComponent(props: P) {
    return (
      <SlideContext.Consumer>{slideInterface => <Component {...props} {...slideInterface} />}</SlideContext.Consumer>
    );
  };
}

const combine = (...objs: { [key: string]: any }[]) => Object.assign({}, ...objs);

export function withFormSlideField<P extends ISlideContext & IFormContext & IAsFieldContext>(
  Component: React.ComponentType<P>,
) {
  // eslint-disable-next-line no-param-reassign
  Component.displayName = 'withFormSlideAsField';
  return function Wrapper(props: P) {
    return (
      <FormContext.Consumer>
        {form => (
          <SlideContext.Consumer>
            {slide => (
              <AsFieldContext.Consumer>
                {field => <Component {...{ ...combine(props, form, slide, field) }} />}
              </AsFieldContext.Consumer>
            )}
          </SlideContext.Consumer>
        )}
      </FormContext.Consumer>
    );
  };
}
