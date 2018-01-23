import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import hasOwnProperty from '@flow-form/helpers/dist/hasOwnProperty';
import classes from '@flow-form/helpers/dist/classes';
import asField from './asField';

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

function renderOption(option) {
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
      const { label, value } = option;
      return (
        <option key={value} value={value}>
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

function renderOptions(options) {
  if (Array.isArray(options)) {
    // An array can be mapped to the render option method
    return options.map(renderOption);
  } else if (isObject(options)) {
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
}

class Field extends Component {
  static propTypes = {
    /**
     * Props shipped from the HOC
     */
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
    isValid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,

    /**
     * Required user props
     */
    type: PropTypes.oneOf(['select', 'textarea', ...INPUT_TYPES]).isRequired,
    name: PropTypes.string.isRequired,

    /**
     * Optional User supplied props. These are handled if not shipped, so we can ignore them
     */
    label: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
  };

  maybeWrapInLabel(children) {
    const { className, errors, isValid, label, required } = this.props;
    return (
      <label
        className={classes([
          className,
          'flowform--field',
          required && 'flowform--field--required',
          !isValid && 'flowform--field-has-errors',
        ])}
      >
        {label && <span className="flowform--field--label">{label}</span>}
        <span className="flowform--field--field">{children}</span>
        <span className="flowform--field--errors">
          {errors.filter(err => err).map(err => (
            <span key={err} className="flowform-field-error">
              {err}
            </span>
          ))}
        </span>
      </label>
    );
  }

  renderField() {
    const {
      type, // we switch on this and send it to `input`
      setRef, // sets the ref in the HOC
      errors, // HOC's state.errors, gets sent to a different method, but we'll ignore it here
      label, // gets sent to a different method, but we'll ignore it here
      isValid, // gets sent to a different method, but we'll ignore it here
      className, // gets sent to a different method, but we'll ignore it here
      options, // valid for selects
      ...spreadProps // the rest of everything that we need to send on
    } = this.props;

    // If it's an input type, then render the input with the spread spreadProps
    if (INPUT_TYPES.includes(type)) {
      return <input ref={setRef} type={type} {...spreadProps} />;
    }

    // Text areas get spreadProps too
    if (type === 'textarea') {
      return <textarea ref={setRef} {...spreadProps} />;
    }

    // For select, we also have to render all the options / optgroups. We've moved these out to
    // separate functions so that we can call them recursively if needed.
    if (type === 'select') {
      return (
        <select ref={setRef} {...spreadProps}>
          {renderOptions(options)}
        </select>
      );
    }

    return (
      <span dangerouslySetInnerHTML={{ __html: `<!-- Unsupported Field Type (${type}) -->` }} />
    );
  }

  render() {
    // Hidden fields are never wrapped in labels
    if (this.props.type === 'hidden') {
      return this.renderField();
    }
    return this.maybeWrapInLabel(this.renderField());
  }
}

export default asField(Field);
