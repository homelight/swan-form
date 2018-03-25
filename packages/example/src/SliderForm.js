/* eslint-disable no-alert, react/prefer-stateless-function */
import React, { Component } from 'react';
import { Field, Radios, Submit } from '@flow-form/field';
import { Slide, Slider } from '@flow-form/slider';
import '@flow-form/slider/dist/Slider.css';
import '@flow-form/slider/dist/Slide.css';

const required = value =>
  value !== null && value !== undefined && value.trim() !== '' ? false : 'Required';
const onSubmit = values => {
  alert(JSON.stringify(values));
  return values;
};
const beforeSubmit = values =>
  Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: values[key].toUpperCase() }), {});

export default class SliderForm extends Component {
  render() {
    return (
      <div>
        <Slider beforeSubmit={beforeSubmit} onSubmit={onSubmit} windowed slides={[]}>
          <Slide
            render={props => (
              <div>
                <h1>A first question</h1>
                <Field
                  type="text"
                  name="first-question"
                  validate={required}
                  size={50}
                  value={props.getFormValues()['first-question']}
                  placeholder="This field is required"
                />
                <p>
                  This slider has four slides. This one, two that we skip, and one with a submit
                  button. After we <em>press</em> submit, we transform the value in the first to an
                  uppercase string (<code>beforeSubmit</code>) that is passed to the actual submit (<code
                  >
                    onSubmit
                  </code>) that is then logged to the console in the after submit method (<code>
                    afterSubmit
                  </code>).
                </p>
              </div>
            )}
          />
          <Slide>Slide One</Slide>
          <Slide>
            <div>Testing, one, two, three.</div>
          </Slide>
          <Slide render={props => <pre>{JSON.stringify(props, null, 2)}</pre>} />
        </Slider>
      </div>
    );
  }
}
