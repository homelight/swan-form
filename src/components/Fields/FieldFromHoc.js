/**
 * This is an experiment to see if I can recreate the Field component just using the as field HOC
 * (for code reuse purposes, let's dog food it)
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import asField from './asField';

import classes from '../../helpers/classes';

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
  'radio', // radio buttons do not work well with the change events...
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

class FieldFromHOC extends Component {
  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
  };

  static defaultProps = {
    errors: [],
  };

  maybeWrapInLabel(children) {
    const { errors, isValid, label, required } = this.props;
    const fieldStyle = classes(['flowform--field--field', required && 'flowform--field--required']);
    if (label) {
      return (
        <label className={classes([!isValid && 'flowform--field-has-errors'])}>
          <span className="flowform--field--label">{label}</span>
          <span className={fieldStyle}>{children}</span>
          <span className="flowform--field--errors">{errors.filter(err => err).join(',')}</span>
        </label>
      );
    }
    return (
      <span className={classes([!isValid && 'flowform--field-has-errors'])}>
        <span className={fieldStyle}>{children}</span>
        <span className="flowform--field--errors">{errors.filter(err => err).join(',')}</span>
      </span>
    );
  }

  renderInputField() {
    const {
      setRef,
      errors,
      label,
      isValid,
      asyncValidate,
      validateWhileTyping,
      ...spreadProps
    } = this.props;
    return <input ref={setRef} {...spreadProps} />;
  }

  renderTextArea() {
    // do not spread "type" into the field
    const {
      type,
      setRef,
      errors,
      label,
      isValid,
      asyncValidate,
      validateWhileTyping,
      ...spreadProps
    } = this.props;

    return <textarea {...spreadProps} />;
  }

  // The way we nest options in a select can be a bit difficult, so we're going to break this into
  // a few different functions
  renderSelectField() {
    const {
      options,
      setRef,
      errors,
      label,
      type,
      isValid,
      asyncValidate,
      validateWhileTyping,
      ...spreadProps
    } = this.props;
    console.log('options', options);
    return (
      <select ref={this.setRef} {...spreadProps}>
        {this.renderOptions(options)}
      </select>
    );
  }

  renderOption(option) {
    if (typeof option === 'string') {
      return <option key={option}>{option}</option>;
    }
    console.log('options', option);
    if (option === null) {
      console.log('option is null');
    }
    if (option !== null && option !== undefined && isObject(option)) {
      if (hasOwnProperty(option, 'label') && hasOwnProperty(option, 'value')) {
        const { label, value } = option;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      }
      return Object.keys(option).map(label => (
        <optgroup key={label} label={label}>
          {this.renderOptions(option[label])}
        </optgroup>
      ));
    }
    // Cannot figure out what to do here. @TODO come up with a better fallback
    return null;
  }

  renderOptions(options) {
    if (Array.isArray(options)) {
      return options.map(this.renderOption);
    } else if (isObject(options)) {
      return Object.keys(options).map(option => {
        if (['string', 'number'].includes(typeof options[option])) {
          return (
            <option key={options[option]} value={options[option]}>
              {option}
            </option>
          );
        }
        if (isObject(options[option]) || Array.isArray(options[option])) {
          return (
            <optgroup key={option} label={option}>
              {this.renderOptions(options[option])}
            </optgroup>
          );
        }
        // Cannot figure out what to do here.
        return null;
      });
    }
  }

  renderField() {
    const { type } = this.props;

    if (INPUT_TYPES.includes(type)) {
      return this.renderInputField();
    }
    if (type === 'textarea') {
      return this.renderTextArea();
    }
    if (type === 'select') {
      return this.renderSelectField();
    }
    return (
      <span dangerouslySetInnerHTML={{ __html: `<!-- Unsupported Field Type (${type}) -->` }} />
    );
  }

  render() {
    console.log(this.props);
    return this.maybeWrapInLabel(this.renderField());
  }
}

export default asField(FieldFromHOC);
