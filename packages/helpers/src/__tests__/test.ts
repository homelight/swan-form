/* global describe, it, expect */
import {
  arraysAreEqual,
  classes,
  execOrMapFn,
  hasOwnProperty,
  identity,
  isDefined,
  isFunction,
  isNull,
  isObject,
  isPromise,
  maybeApply,
  memoize,
  noop,
  required,
} from '../index';

describe('Shared helper functions tests', () => {
  it('noop returns undefined', () => {
    expect(noop()).toBe(undefined);
  });

  it('hasOwnProperty works', () => {
    expect(hasOwnProperty({ test: 1 }, 'test')).toBe(true);
  });

  it('classes:: array of strings is the joined string', () => {
    expect(classes(['a', 'b'])).toBe('a b');
  });

  it('classes:: expect false expression in array to filter out class', () => {
    expect(classes(['a', false && 'b'])).toBe('a');
  });

  it('classes:: expect string to return string', () => {
    expect(classes('test')).toBe('test');
  });

  it('classes:: expect undefined to be an empty string', () => {
    expect(classes()).toBe('');
  });

  it('classes:: expect null to be an empty string', () => {
    expect(classes(null)).toBe('');
  });

  it('classes:: expect object to filter correct values', () => {
    expect(classes({ a: true, b: false })).toBe('a');
  });

  it('classes:: expect object with weird keys to filter correct values', () => {
    expect(classes({ 'a-a': true, b: false, 'Ab_ aaa': true })).toBe('a-a Ab_ aaa');
  });

  it('required:: expect required to error on empty string', () => {
    expect(required('')).toBe('Required');
  });

  it('required:: expect required to error on null', () => {
    expect(required(null)).toBe('Required');
  });

  it('required:: expect required not to error with 0', () => {
    expect(required(0)).toBe(false);
  });

  it('required:: expect required not to error with a string', () => {
    expect(required('a string')).toBe(false);
  });

  it('isObject:: is object detects objects', () => {
    expect(isObject({})).toBe(true);
  });

  it('isObject:: is object does not detect a string', () => {
    expect(isObject('a string')).toBe(false);
  });

  it('isFunction:: is function detects a function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('isFunction:: is function does not detect a Promise', () => {
    expect(isFunction(new Promise(res => res()))).toBe(false);
  });

  it('isDefined:: expect is undefined not to be detected', () => {
    const o = {};
    // @ts-ignore: `not-defined` is not defined, and that's what we're testing for
    expect(isDefined(o.notDefined)).toBe(false);
  });

  it('arraysAreEqual:: detects two empty arrays to be equal', () => {
    expect(arraysAreEqual([], [])).toBe(true);
  });

  it('arraysAreEqual:: detects two filled arrays to be equal', () => {
    expect(arraysAreEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('arraysAreEqual:: detects two different arrays not to be equal', () => {
    expect(arraysAreEqual(['1'], [1])).toBe(false);
  });

  it('memoize:: is called only once', () => {
    const mock = jest.fn(x => x);
    const mem = memoize(mock);
    mem(1);
    mem(1);
    expect(mock.mock.calls.length).toBe(1);
  });

  it('memoize:: is called once per arg', () => {
    const mock = jest.fn(x => x);
    const mem = memoize(mock);
    mem(1);
    mem(2);
    mem(1);
    mem(2);
    expect(mock.mock.calls.length).toBe(2);
  });

  it('isNull:: detects null', () => {
    const t = null;
    expect(isNull(t)).toBe(true);
  });

  it('isNull:: does not detect undefined', () => {
    expect(isNull(undefined)).toBe(false);
  });

  it('isPromise:: detects a thenable', () => {
    expect(isPromise(new Promise(res => res()))).toBe(true);
  });

  it('isPromise:: does not detect a string', () => {
    expect(isPromise('Promise')).toBe(false);
  });

  it('execOrMapFn:: execOrMapFn calls an array of fns', () => {
    const five = () => 5;
    expect(execOrMapFn([five, five, five, five, five])).toEqual([5, 5, 5, 5, 5]);
  });

  it('execOrMapFn:: execOrMapFn calls an array of fns with an arg', () => {
    const five = x => x + 5;
    expect(execOrMapFn([five, five, five, five, five], 1)).toEqual([6, 6, 6, 6, 6]);
  });

  it('execOrMapFn:: execOrMapFn calls an array of fns with multiple args', () => {
    const five = (x, y) => x + 5 + y;
    expect(execOrMapFn([five, five, five, five, five], 1, 2)).toEqual([8, 8, 8, 8, 8]);
  });

  it('execOrMapFn:: execOrMapFn calls a single fn with an arg', () => {
    expect(execOrMapFn(identity, 1, 2)).toEqual(1);
  });

  it('maybeApply:: maybe apply returns an arg when the fn is not a func', () => {
    expect(maybeApply('hi', 'five')).toEqual(['five']);
  });

  it('maybeApply:: maybe apply returns an arg when the fn is not a func', () => {
    expect(maybeApply('hi', 'five', 'dive', 'live')).toEqual(['five', 'dive', 'live']);
  });

  it('maybeApply:: maybe apply returns executes a fn with an arg', () => {
    const five = x => x + 5;
    expect(maybeApply(five, 1)).toEqual(6);
  });
});
