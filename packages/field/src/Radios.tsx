import * as React from 'react';
import asField from './asField';
import { Field, getFieldClasses, getErrors } from './Field';

export interface Option {
  label: string;
  value: string;
}

export interface RadiosProps {
  name: string;
  options: Option[];
  autoFocus?: boolean;
  [key: string]: any;
}

const emptyArray: any[] = [];
const noop = () => {};
const removeNonAlphaNumeric = (val: string) => val.replace(/[^a-z0-9]{1,}/gi, '');

function createRadio(option: Option, props: RadiosProps, index: number) {
  const id = `${props.name}-${removeNonAlphaNumeric(String(option.value))}`;
  const checked = props.value === option.value;
  // We use these to override some things
  const local = { key: id, id, checked, errors: emptyArray, type: 'radio', ref: index === 0 ? props.setRef : noop };
  // Reuse the `Field` component as the radio button, but use create a unique id for the field
  // also, override the value and label for the radio with the values passed as the option
  // @ts-ignore
  return <Field {...props} {...option} {...local} />;
}

class FieldSet extends React.Component<RadiosProps, any> {
  static displayName = 'Radios';

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
        {options.map((option: Option, index: number) => createRadio(option, this.props, index))}
        {getErrors(errors)}
      </fieldset>
    );
  }
}

export const Radios = asField(FieldSet);
export default Radios;
