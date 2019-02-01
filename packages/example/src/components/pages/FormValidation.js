import React, { Component } from 'react';
import Form from '@swan-form/form';
import Field, { Submit } from '@swan-form/field';
import { FormContext, required } from '@swan-form/helpers';

const onSubmit = values => Promise.resolve(values);

const validateForm = values => {
  console.log(values, !values.textField2);
  if (!values.textField2) {
    return 'Fill out textField2';
  }
  return false;
};

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
            console.log(formErrors);
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
