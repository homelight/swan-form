import React, { Component } from 'react';
import { Field, Slider, Submit } from './flow-form';

const required = value =>
  value !== null && value !== undefined && value.trim() !== '' ? false : 'Required';
const onSubmit = values => alert(values);
export default class SliderForm extends Component {
  render() {
    return (
      <div>
        <Slider
          onSubmit={onSubmit}
          slides={[
            {
              render: () => (
                <div>
                  <h1>A first question</h1>
                  <Field
                    type="text"
                    name="first-question"
                    validate={required}
                    size={50}
                    placeholder="This field is required"
                  />
                </div>
              ),
            },
            {
              render: () => (
                <div>
                  <h2>This is slide 2</h2>
                </div>
              ),
              shouldShowIf: () => false,
            },
            {
              render: () => (
                <div>
                  <h2>This is slide 3</h2>
                </div>
              ),
              shouldShowIf: () => false,
            },
            {
              render: () => (
                <div>
                  <h2>I will show, and I'm the last slide</h2>
                  <Submit onSubmit={onSubmit} />
                </div>
              ),
            },
          ]}
        />
      </div>
    );
  }
}
