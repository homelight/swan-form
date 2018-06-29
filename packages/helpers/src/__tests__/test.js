/* global describe, it, expect */
import { hasErrors, runValidations, emptyArray, noop, hasOwnProperty, classes } from '..';

describe('Shared helper functions tests', () => {
  it('hasErrors should filter all `[false, false, false]` to be false', () => {
    expect(hasErrors([false, false, false])).toBe(false);
  });

  it("hasErrors should filter all `['test', false, false]` to be true", () => {
    expect(hasErrors(['test', false, false])).toBe(true);
  });

  it('hasErrors should have an empty array be false', () => {
    expect(hasErrors([])).toBe(false);
  });

  it('runValidations should pass', () => {
    const validate = value => (value === true ? false : 'should be true');
    expect(runValidations(validate, true)).toEqual(expect.arrayContaining([false]));
  });

  it('runValidations should fail on array of functions that return messages', () => {
    const validate = [() => 'strings indicate failure', value => (value === true ? 'error' : false)];
    expect(runValidations(validate, true)).toEqual(expect.arrayContaining(['strings indicate failure', 'error']));
  });

  it('runValidations should fail', () => {
    const validate = value => (value === true ? false : 'should be true');
    expect(runValidations(validate, false)).toEqual(expect.arrayContaining(['should be true']));
  });

  it('runValidations should return false array on non-functions/arrays', () => {
    expect(runValidations('string', false)).toEqual(emptyArray);
  });

  it('runValidations on ["string", fn => false] shoud be [false,false]', () => {
    expect(runValidations([false, () => false], false)).toEqual(expect.arrayContaining([false, false]));
  });

  it('runValidations with fn that returns array to pass', () => {
    const validate = value => [!value.length > 2, !value];
    expect(runValidations(validate, 'test')).toEqual(expect.arrayContaining([false, false]));
  });

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
    expect(classes({ 'a-a': true, $$b: false, 'Ab_ aaa': true })).toBe('a-a Ab_ aaa');
  });
});
