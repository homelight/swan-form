import * as React from 'react';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isPlainObject from 'lodash/isPlainObject';

import {
  AsFieldContext,
  FormContext,
  SlideContext,
  withAsField,
  withForm,
  withSlide,
  withFormSlideField,
} from './contexts';
import required, { createRequired } from './required';
import createFormatter from './createFormatter';
import keyCodes from './keyCodes';

/**
 * Generic Types
 */

/**
 * Generic typing for component wrapped in an HoC
 */
export type RC<P> = React.SFC<P> | React.ComponentClass<P>;

/**
 * Generic typing for an HOC
 */
export type HOC<O, P> = (C: RC<O>) => RC<P>;

/**
 * Omits keys from an existing type
 */
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

/**
 * Subtracts keys from an existing type
 */
export type Subtract<T, K> = Omit<T, keyof K>;

/* eslint-disable no-nested-ternary */
/**
 * Executes a the first arg as a function if it is a function with supplied arguments
 * Returns the first arg if not a function
 */
export const execIfFunc = (fn: any, ...args: any[]) => (isFunction(fn) ? (args.length > 0 ? fn(...args) : fn()) : fn);
/* eslint-enable no-nested-ternary */

/**
 * Executes the first arg if a function with remaining args; else, returns an array of remaining args
 */
export const maybeApply = (fn: any, ...args: any[]) => (isFunction(fn) ? fn(...args) : args);

/**
 * Executes first arg if function, if first arg is array, runs execIfFunc across them
 */
export const execOrMapFn = (fn: any | any[], ...args: any[]) =>
  Array.isArray(fn) ? fn.map(f => execIfFunc(f, ...args)) : execIfFunc(fn, ...args);

/**
 * Provide this to be classNames
 */
export function classes(...args: any[]) {
  const arr = args.reduce((c: any[], obj) => {
    if (Array.isArray(obj)) {
      return [...c, ...obj.filter(Boolean)];
    }
    if (isPlainObject(obj)) {
      return [
        ...c,
        ...Object.keys(obj)
          // @ts-ignore: this is an object
          .map(k => Boolean(obj[k]) && k)
          .filter(Boolean),
      ];
    }

    return [...c, typeof obj === 'string' ? obj : ''];
  }, []);
  return arr.filter(Boolean).join(' ');
}

/**
 * Checks if the argument is defined
 */
export const isDefined = (arg: any) => typeof arg !== 'undefined';

/**
 * Checks if the arg is null
 */
export const isNull = (arg: any) => arg === null;

/**
 * Checks if the argument is `thennable`
 */
export const isPromise = (obj: any): boolean =>
  obj && ['function', 'object'].includes(typeof obj) && isFunction(obj.then);

/**
 * Wraps an object in a Promise.resolve if it is not thennable
 */
export const maybePromisify = (obj: any) => (isPromise(obj) ? obj : Promise.resolve(obj));

/**
 * Returns first defined value, defaults to empty string
 */
export const findValue = (...args: any[]) => {
  for (let i = 0; i < args.length; i++) {
    if (isDefined(args[i])) {
      return args[i];
    }
  }
  return '';
};
/**
 * Returns an object sans keys
 */
export const filterKeysFromObj = (keys: string[], obj: { [key: string]: any }) =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});

/**
 * Does nothing
 */
export const noop = () => {};

/**
 * Returns the argument
 */
export const identity = (x: any): any => x;

/**
 * An easier way to call Object.prototype.hasOwnProperty.call
 */
export const hasOwnProperty = (obj: any, prop: string): boolean =>
  isNull(obj) || !isDefined(obj) ? false : Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * Composes HOCs with some type safety. Composed as (inner, middle, outer)
 */
export const composeHOCs = <P extends {}>(...hocs: HOC<any, any>[]) => (Component: RC<P>) =>
  hocs.reduce((g, f) => f(g), Component);

/**
 * Runs `getValue` on every item in an object
 */
export const gatherValues = (set: { [key: string]: { getValue(): any } }): { [key: string]: any } =>
  Object.keys(set).reduce((values, name) => ({ ...values, [name]: set[name].getValue() }), {});

/**
 * Calls validate on every item in an object and combines the results into a single array
 */
export const gatherErrors = (
  set: {
    [key: string]: {
      validate(value: any, updateErrors: boolean): React.ReactNode[];
      getValue(): any;
    };
  },
  updateErrors = false,
): React.ReactNode[] =>
  Object.keys(set)
    .reduce((errors, name) => {
      const field = set[name];
      const value = field.getValue();
      return [...errors, ...field.validate(value, updateErrors)];
    }, [])
    .filter(Boolean);

/**
 * Attempts to transform a ReactNode into a uniqueish key
 */
export const toKey = (arg: React.ReactNode): string | number => {
  if (typeof arg === 'string' || typeof arg === 'number') {
    return arg;
  }

  if (isNull(arg) || isDefined(arg)) {
    return '';
  }

  if (hasOwnProperty(arg, 'toString')) {
    return arg!.toString();
  }

  if (isObject(arg)) {
    return JSON.stringify(arg);
  }

  return String(arg);
};

const typesWithSelectionStart = ['text', 'search', 'password', 'tel', 'url'];
/**
 * Checks a whitelist of input types to see if you can access selectionStart on the input node
 * (otherwise, Safari errors)
 */
export const canAccessSelectionStart = (type: string): boolean => typesWithSelectionStart.includes(type);

/**
 * Moves the cursor on fields
 *
 * Works on text based inputs
 *
 */
export function moveCursor(el: any, position = -1) {
  /* eslint-disable no-param-reassign */
  // @ts-ignore
  if (canAccessSelectionStart(el.type)) {
    const pos = position > -1 ? position : el.value.length;
    // eslint-disable-next-line no-multi-assign
    el.selectionStart = el.selectionEnd = pos;
  } else if ('createTextRange' in el && isFunction(el.createTextRange)) {
    const range = el.createTextRange();
    range.collapse(false);
    range.select();
  } else {
    // Hack fix for <input type="number" />
    const tmpValue = el.value;
    el.value = '';
    el.value = tmpValue;
  }
  /* eslint-enable no-param-reassign */
}

export {
  AsFieldContext,
  createFormatter,
  createRequired,
  FormContext,
  keyCodes,
  required,
  SlideContext,
  withAsField,
  withForm,
  withSlide,
  withFormSlideField,
};
