/* global describe, it, expect */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Field from './Field';

describe('Text Field Input Suite', () => {
  it('should shallow render with no error', () => {
    const wrapper = shallow(<Field name="test" type="text" />);
  });

  it('should mount with no error', () => {
    const wrapper = mount(<Field name="test" type="text" />);
  });

  it('should render with no error', () => {
    const wrapper = render(<Field name="test" type="text" />);
  });

  const wrapper = render(<Field name="test" type="text" />);
  it('should have an input field with the name of "test"', () => {
    expect(wrapper.find('input').attr('name')).toBe('test');
  });

  it('should have an input field with the tpye of "text"', () => {
    expect(wrapper.find('input').attr('type')).toBe('text');
  });

  it('should have an input field with the value of ""', () => {
    expect(wrapper.find('input').attr('value')).toBe('');
  });
  // console.log(wrapper);
});
