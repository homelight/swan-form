# @swan-form/field

Contains the main `Field` React component for @swan-form.

Example usage:

```jsx
import Form from '@swan-form/form';
import Field from '@swan-form/field';

const handleOnSubmit = values => {
  console.log(values);
  return Promise.resolve(values);
};

const MyForm = () => (
  <Form name="my-form" onSubmit={handleOnSubmit}>
    <Field type="text" name="aTextField" label="Text Field" />
    <Field type="checkbox" name="checkboxOne" defaultChecked />
    <Field type="checkbox" name="checkboxTwo" />
  </Form>
);
```

See more at https://github.com/helloeave/swan-form/README.md
