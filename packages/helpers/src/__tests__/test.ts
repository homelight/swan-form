/* global describe, it, expect */
import { noop, hasOwnProperty, classes } from '../index';

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
    expect(classes({ 'a-a': true, $$b: false, 'Ab_ aaa': true })).toBe('a-a Ab_ aaa');
  });
});
