import React, { Component } from 'react';
import Form from '@swan-form/form';
import Field, { Submit } from '@swan-form/field';
import { FormContext, required } from '@swan-form/helpers';

const onSubmit = values => console.log(values) || Promise.resolve(values);

const validateForm = values => (!values.textField2 ? 'Fill out textField2' : false);

const beforeSubmit = values => Promise.resolve(values); //Promise.reject('This is not right');

export default class FormValidation extends Component {
  render() {
    return (
      <Form onSubmit={onSubmit} validate={validateForm} beforeSubmit={beforeSubmit}>
        <div>
          <h5>This has field validation</h5>
          <Field name="textField1" type="text" validate={required} />
        </div>
        <div>
          <h5>This has form validation</h5>
          <Field name="textField2" type="text" />
        </div>
        <FormContext.Consumer>
          {({ formErrors }) => {
            console.log('Form errors', formErrors);
            return (
              <div>
                {formErrors.map((err, index) => (
                  <div key={index}>{err}</div>
                ))}
              </div>
            );
          }}
        </FormContext.Consumer>
        <Submit />
      </Form>
    );
  }
}
