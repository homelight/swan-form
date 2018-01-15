import React, { Component } from 'react';
import { Field, Slide, Slider } from './flow-form';

const required = value =>
  value !== null && value !== undefined && value.trim() !== '' ? false : 'Required';

export default class SliderForm extends Component {
  render() {
    return (
      <div>
        <Slider
          slides={[
            {
              render: () => (
                <div>
                  <h1>A first question</h1>
                  <Field type="text" name="first-question" validate={required} />
                </div>
              ),
            },
            {
              render: () => <div>Hi ma 2!</div>,
              shouldShowIf: () => false,
            },
            {
              render: () => <div>Hi ma 3!</div>,
              shouldShowIf: () => false,
            },
            {
              render: () => <div>Hi ma 4!</div>,
            },
          ]}
        />
      </div>
    );
  }
}
