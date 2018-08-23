import * as React from 'react';
import asField from './asField';
import { Field, getFieldClasses, getErrors } from './Field';

export interface Option {
  label: string;
  value: string;
}

export interface RadiosProps {
  name: string;
  [key: string]: any;
}

const emptyArray: any[] = [];

function createRadio(option: Option, props: RadiosProps) {
  const id = `${props.name}-${('' + option.value).replace(/[^a-z0-9]{1,}/gi, '')}`;
  const checked = props.value === option.value;
  const local = { key: id, id, checked, errors: emptyArray, type: 'radio' };
  // Reuse the `Field` component as the radio button, but use create a unique id for the field
  // also, override the value and label for the radio with the values passed as the option
  // @ts-ignore
  return <Field {...props} {...option} {...local} />;
}

class FieldSet extends React.Component<RadiosProps, any> {
  render() {
    const { errors, className, required, label, options } = this.props;

    const appliedClasses = getFieldClasses({
      errors,
      className,
      required,
      type: 'radios',
      isSet: true,
    });

    return (
      <fieldset className={appliedClasses}>
        {label && <legend>{label}</legend>}
        {options.map((option: Option) => createRadio(option, this.props))}
        {getErrors(errors)}
      </fieldset>
    );
  }
}

export const Radios = asField(FieldSet);
export default Radios;
