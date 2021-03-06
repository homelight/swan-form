/* eslint-disable react/button-has-type */
import * as React from 'react';

import { classes, hasOwnProperty, isObject, noop, toKey } from '@swan-form/helpers';

import asField, { InjectedProps } from './asField';

export interface FieldProps {
  name: string;
  type: string;

  required?: boolean;
  id?: string;
  // errors?: React.ReactNode[];
  className?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  // setRef?(el: any): void;
  // onChange?(event: React.ChangeEvent<any>): void;
  // onBlur?(event: React.FocusEvent<any>): void;
  // setValue?(value: any): void;
  style?: React.CSSProperties;
  options?: any;
  /**
   * Passed by the form context
   */
  isFormSubmitting?: boolean;
  /**
   * Passed by the form context
   */
  hasFormSubmitted?: boolean;
}

const NO_WRAP = ['button', 'hidden', 'reset', 'submit'];

const INPUT_TYPES = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio', // radio buttons should probably not be used as regular fields because they're sets.
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

const emptyObject = {};

/**
 * Gets the classes applied to the outermost node in the field
 */
export const getFieldClasses = (props: Partial<FieldProps & InjectedProps> & { isSet?: boolean }) => {
  const { type, errors, className, required, icon, isSet } = props;
  return classes(
    isSet ? 'sf--fieldset' : 'sf--field',
    `sf--type-${type || 'text'}`,
    required && 'sf--required',
    icon && 'sf--has-icon',
    errors!.length !== 0 && 'sf--has-errors',
    className,
  );
};

/**
 * Maps the errors consistently
 */
export const getErrors = (errors: React.ReactNode[]) => (
  <span className="sf--errors">
    {errors.map((error: React.ReactNode) => (
      <span key={toKey(error)} className="sf--error">
        {error}
      </span>
    ))}
  </span>
);

/* eslint-disable no-use-before-define */
function renderOption(option: any): React.ReactNode {
  // If the option is either a string or a number, then we'll use it for both the key and value.
  if (['string', 'number'].includes(typeof option)) {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  }
  // If the option is an object, then it's either an optgroup or a they're passing a label/value
  if (isObject(option)) {
    // If it's a label/value object, the render it appropriately
    if (hasOwnProperty(option, 'label') && hasOwnProperty(option, 'value')) {
      const { label, value, disabled = false } = option;
      return (
        <option key={value} value={value} disabled={disabled}>
          {label}
        </option>
      );
    }
    // So, it's an optgroup / set of optgroups, so render each key as an optgroup and pass the
    // value back to the renderOptions function.
    return Object.keys(option).map(label => (
      <optgroup key={label} label={label}>
        {renderOptions(option[label])}
      </optgroup>
    ));
  }
  // Cannot figure out what to do here. So, we'll just let react ignore it.
  return null;
}

function renderOptions(options: any | any[]): React.ReactNode {
  if (Array.isArray(options)) {
    // An array can be mapped to the render option method
    return options.map(renderOption);
  }

  if (isObject(options)) {
    // If it's an object, then we have to figure out if they're passing options or optgroups
    return Object.keys(options).map(option => {
      // If the value of a key is either a string or number, then key:value :: label:value, so
      // map an option like that.
      if (['string', 'number'].includes(typeof options[option])) {
        return (
          <option key={options[option]} value={options[option]}>
            {option}
          </option>
        );
      }
      // If the value is either an object or an array, then we have an optgroup, so we'll set the
      // optgroup as the option and then pass its values back to this same function.
      if (isObject(options[option]) || Array.isArray(options[option])) {
        return (
          <optgroup key={option} label={option}>
            {renderOptions(options[option])}
          </optgroup>
        );
      }
      // Cannot figure out what to do here. So, we'll just let react ignore it.
      return null;
    });
  }

  return null;
}
/* eslint-enable no-use-before-define */

export class FieldRender extends React.PureComponent<FieldProps & InjectedProps, {}> {
  static displayName = 'Field';

  getId = () => this.props.id || this.props.name;

  getInput = (appliedClasses = '') => {
    const {
      errors,
      className,
      label,
      type,
      icon,
      setRef,
      options,
      setValue,
      isFormSubmitting,
      hasFormSubmitted,
      ...props
    } = this.props;

    const id = this.getId();

    /**
     * This is an experiment. The input event seems to run faster than the change event, but react
     * complains if we don't pass onChange, so we'll send a noop function. We're making the
     * optimization for text fields only.
     *
     * @see  Some discussion https://github.com/facebook/react/issues/3964
     */
    if (type === 'text' || !type) {
      // @ts-ignore: this is fine
      props.onInput = props.onChange;
      // @ts-ignore: React complains if there is no `onChange` method
      props.onChange = noop;
    }

    if (type === 'checkbox') {
      // @ts-ignore
      props.checked = props.value;
    }

    if (type === 'file') {
      // For browser security reasons, we can't set the value for file field types
      delete props.value;
    }

    const submitResetClasses = classes(
      appliedClasses,
      isFormSubmitting && 'sf--form-submitting',
      hasFormSubmitted && 'sf--form-submitted',
    );

    switch (type) {
      case 'select':
        return (
          <select {...props} ref={setRef} id={id}>
            {renderOptions(options)}
          </select>
        );
      case 'textarea':
        return <textarea {...props} className={appliedClasses} ref={setRef} id={id} />;
      case 'button':
        return <button {...props} className={appliedClasses} type={type} id={id} ref={setRef} />;
      case 'submit':
      case 'reset':
        return props.children ? (
          <button {...props} className={submitResetClasses} type={type} id={id} ref={setRef} />
        ) : (
          <input {...props} className={submitResetClasses} type={type} id={id} ref={setRef} />
        );
      default:
        return (
          <input
            {...props}
            className={appliedClasses}
            type={INPUT_TYPES.includes(type) ? type : 'text'}
            id={id}
            ref={setRef}
          />
        );
    }
  };

  render() {
    const id = this.getId();
    const { errors, label, type, icon, style = emptyObject } = this.props;

    const appliedClasses = getFieldClasses(this.props);

    if (!NO_WRAP.includes(type)) {
      return (
        <label htmlFor={id} className={appliedClasses} style={style}>
          <span>
            {this.getInput()}
            <span className="sf--label">{label}</span>
            <span className="sf--icon">{icon}</span>
            {getErrors(errors)}
          </span>
        </label>
      );
    }

    return this.getInput(appliedClasses);
  }
}

// @TODO fix typings
export const Field = asField(FieldRender);
// export const Field = asField<FieldProps>(FieldRender);
export default Field;
