/* eslint-disable no-alert, react/prefer-stateless-function */
import React, { Component } from 'react';
import { Field, Radios, Submit } from '@flow-form/field';
import { Slider } from '@flow-form/slider';
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
        <Slider
          beforeSubmit={beforeSubmit}
          onSubmit={onSubmit}
          windowed
          slides={[
            {
              key: 'first',
              render: props => (
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
                    button. After we <em>press</em> submit, we transform the value in the first to
                    an uppercase string (<code>beforeSubmit</code>) that is passed to the actual
                    submit (<code>onSubmit</code>) that is then logged to the console in the after
                    submit method (<code>afterSubmit</code>).
                  </p>
                </div>
              ),
              onExit: values => {
                console.log(values);
              },
            },
            {
              key: 'second',
              render: props => (
                <div>
                  <h2>Decision Tree</h2>
                  <p>
                    Here are two radio buttons. If you choose the first one, you'll see the next
                    slide and skip the one after that. If you choose the other one, you'll see the
                    reverse.
                  </p>
                  <Radios
                    validate={required}
                    name="decisionTree"
                    options={[
                      { label: 'Next Slide', value: '0' },
                      { label: 'The Other One', value: '1' },
                    ]}
                    value={props.getFormValues()['decisionTree']}
                  />
                </div>
              ),
            },
            {
              key: 'third-a',
              render: (
                <div>
                  <h2>You chose the first slide.</h2>
                  <p>(This is a static message, in case you&apos;re wondering).</p>
                </div>
              ),
              shouldShowIf: values => values.decisionTree === '0',
            },
            {
              key: 'third-b',
              render: (
                <div>
                  <h2>You skipped the last slide.</h2>
                  <p>(This is a static message, in case you&apos;re wondering).</p>
                </div>
              ),
              shouldShowIf: values => values.decisionTree === '1',
            },
            {
              key: 'fourth',
              render: props => (
                <div>
                  <pre>{JSON.stringify(props.getFormValues(), null, 2)}</pre>
                  <h2>I will show, and I&apos;m the last slide</h2>
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
