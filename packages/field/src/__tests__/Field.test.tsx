/* global describe, it, expect */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import Field from '../Field';
import { getInitialValue } from '../asField';

configure({ adapter: new Adapter() });

describe('Determine Initial Value', () => {
  it('value should take precedence over default value', () => {
    expect(getInitialValue({ name: 'test', type: 'text', value: true, defaultValue: false })).toBe(true);
  });

  it('should use defaultValue if supplied when no value is supplied', () => {
    expect(getInitialValue({ name: 'test', type: 'text', defaultValue: false })).toBe(false);
  });

  it('should default to an empty string', () => {
    expect(getInitialValue({ name: 'test', type: 'text' })).toBe('');
  });

  it('should default to an array with a single string when it is a multiple select', () => {
    expect(getInitialValue({ name: 'test', type: 'select', multiple: true })).toEqual(expect.arrayContaining(['']));
  });

  it('should allow defaultValue to succeed if value is explicitly undefined', () => {
    expect(getInitialValue({ name: 'test', type: 'text', value: undefined, defaultValue: false })).toBe(false);
  });
});

describe('Text Field Input Suite', () => {
  it('should shallow render with no error', () => {
    shallow(<Field name="test" type="text" />);
  });

  it('should mount with no error', () => {
    mount(<Field name="test" type="text" />);
  });

  it('should render with no error', () => {
    render(<Field name="test" type="text" />);
  });

  const testTextField = render(<Field name="test" type="text" />);
  it('should have an input field with the name of "test"', () => {
    expect(testTextField.find('input').attr('name')).toBe('test');
  });

  it('should have an input field with the tpye of "text"', () => {
    expect(testTextField.find('input').attr('type')).toBe('text');
  });

  it('should have an input field with the value of ""', () => {
    expect(testTextField.find('input').attr('value')).toBe('');
  });

  const multipleSelect = render(
    <Field
      name="selectField"
      type="select"
      multiple
      options={['one', 'two', 'three', { label: 'four', value: 'four' }, { OptGroup: ['abc', 'def', 'hij'] }]}
    />,
  );
  it('renders weird multiple select correctly', () => {
    expect(multipleSelect.find('select').attr('multiple')).toBe('multiple');
    // @todo add more tests on this select
  });

  it('renders textareas correctly', () => {
    const node = render(<Field type="textarea" name="test" value="abc" />);
    expect(node.find('textarea')[0].children[0].data).toBe('abc');
  });

  it('renders hidden fields', () => {
    const hidden = render(<Field type="hidden" name="test" value="1" />);
    expect(hidden[0].attribs.type).toBe('hidden');
  });
});
