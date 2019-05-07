/* global describe, it, expect */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { fireEvent, render, cleanup } from 'react-testing-library';

import { asField, getInitialValue } from '../asField';
import { Field, FieldRender } from '../Field';

afterEach(cleanup);

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
    expect(getInitialValue({ name: 'test', type: 'select', multiple: true })).toEqual(expect.arrayContaining([]));
  });

  it('should allow defaultValue to succeed if value is explicitly undefined', () => {
    expect(getInitialValue({ name: 'test', type: 'text', value: undefined, defaultValue: false })).toBe(false);
  });
});

const debug = false;
/* eslint-disable no-console */
const handle = {
  onClick: event => debug && console.log(event),
  onChange: event => debug && console.log(event),
  onInput: event => debug && console.log(event),
  onFocus: event => debug && console.log(event),
  onBlur: event => debug && console.log(event),
  onReset: event => debug && console.log(event),
  onSubmit: event => debug && console.log(event),
  onKeyDown: event => debug && console.log(event),
};
/* eslint-enable no-console */

describe('Text Field Input Suite', () => {
  it('changing defaultValue does not change stored value', () => {
    expect.assertions(2);
    const { getByDisplayValue, rerender } = render(<Field type="text" name="test" defaultValue="one" />);

    expect(getByDisplayValue('one').value).toBe('one');
    rerender(<Field type="text" name="test" defaultValue="two" />);
    expect(getByDisplayValue('one').value).toBe('one');
  });

  it('changing the value props changes stored value', () => {
    expect.assertions(2);
    const { getByDisplayValue, rerender } = render(<Field type="text" name="test" value="one" />);

    expect(getByDisplayValue('one').value).toBe('one');
    rerender(<Field type="text" name="test" value="two" />);
    expect(getByDisplayValue('two').value).toBe('two');
  });

  it('sending no id results in the id being the name', () => {
    const { getByDisplayValue } = render(<Field type="text" name="testing123" value="something unique" />);
    expect(getByDisplayValue('something unique').id).toBe('testing123');
  });

  it('sending any id uses that instead of the name', () => {
    const { getByDisplayValue } = render(<Field type="text" id="bob" name="testing123" value="something unique" />);
    expect(getByDisplayValue('something unique').id).toBe('bob');
  });

  it('onFocus is called when passed', () => {
    const spy = jest.spyOn(handle, 'onFocus');
    const { container } = render(<Field type="text" name="test" onFocus={spy} />);
    const [input] = container.querySelectorAll('input');
    fireEvent.focus(input);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('onBlur is called when passed', () => {
    const spy = jest.spyOn(handle, 'onBlur');
    const { container } = render(<Field type="text" name="test" onBlur={spy} />);
    const [input] = container.querySelectorAll('input');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('calling the input event changes the value', () => {
    const { container } = render(<Field type="text" name="test" />);
    const [input] = container.querySelectorAll('input');
    fireEvent.input(input, { target: { value: 'one two three' } });
    expect(input.value).toBe('one two three');
  });
});

describe('Checkbox Field Input Suite', () => {
  it('should have checkboxes go to value based on defaultChecked', () => {
    const { container } = render(<Field name="test" type="checkbox" defaultChecked />);
    const [input] = container.querySelectorAll('input');
    expect(input.checked).toBe(true);
  });

  it('should have checkboxes go to value based on checked over defaultChecked', () => {
    const { container } = render(<Field name="test" type="checkbox" checked={false} defaultChecked />);
    const [input] = container.querySelectorAll('input');
    expect(input.checked).toBe(false);
  });
});

describe('Button Field Input Suite', () => {
  it('should render with child props and no value', () => {
    const { container } = render(
      <Field name="test" type="button">
        Test
      </Field>,
    );
    const [button] = container.querySelectorAll('button');
    expect(button.name).toBe('test');
  });

  it('should render with no children and a value', () => {
    expect(render(<Field name="test" type="button" value="Test" />));
  });
});

describe('Select Field Input Suite', () => {
  const options = ['one', 'two', 'three', { label: 'four', value: 'four' }, { OptGroup: ['abc', 'def', 'hij'] }];

  it('renders weird multiple select correctly', () => {
    const { container } = render(<Field name="selectField" type="select" multiple options={options} />);
    const [multipleSelect] = container.querySelectorAll('select');
    expect(multipleSelect.multiple).toBe(true);
  });
});

describe('Textarea Field Input Suite', () => {
  it('renders textareas correctly', () => {
    const { container } = render(<Field type="textarea" name="test" value="abc" />);
    const [textarea] = container.querySelectorAll('textarea');
    expect(textarea.value).toBe('abc');
  });
});

describe('Hidden Field Input Suite', () => {
  it('renders hidden fields', () => {
    const { container } = render(<Field type="hidden" name="test" value="1" />);
    const [hidden] = container.querySelectorAll('input');
    expect(hidden.type).toBe('hidden');
  });
});
