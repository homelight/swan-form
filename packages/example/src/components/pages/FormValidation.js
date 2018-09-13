import React, { Component } from 'react';
import Form from '@swan-form/form';
import Field, { Submit } from '@swan-form/field';
import { FormContext, required } from '@swan-form/helpers';

const onSubmit = values => {
  console.log(values);
  return Promise.resolve(values);
};

const validateForm = values => {
  console.log('Called with', values);
  if (!values.testField2) {
    console.log('There is a problem');
    return 'Fill out testField2';
  }
  return false;
};

const beforeSubmit = values => {
  return Promise.reject('This is not right');
};

const afterSubmit = values => {
  console.log('In after submit');
  return values;
};

export default class FormValidation extends Component {
  render() {
    return (
      <Form onSubmit={onSubmit} validate={validateForm} beforeSubmit={beforeSubmit} afterSubmit={afterSubmit}>
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
