/* eslint-disable react/require-default-props */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import isObject from 'lodash/isObject';
import { hasOwnProperty, classes, noop } from '@swan-form/helpers';
import asField from './asField';
import { FieldProps } from '../common.d';

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

// A list of input types not to wrap in a label
const noWrap = ['button', 'hidden', 'reset', 'submit'];

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

class Field extends React.PureComponent<FieldProps> {
  static displayName = 'Field';

  static propTypes = {
    /**
     * Props shipped from the HOC
     */
    /**
     * An array of error messages (false means no error)
     * @type {Array}
     */
    errors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])])).isRequired,
    /**
     * Whether or not the field's value is valid
     * @type {Boolean}
     */
    isValid: PropTypes.bool.isRequired,
    /**
     * The onChange handler, provided by asField
     * @type {Function}
     */
    onChange: PropTypes.func.isRequired,
    /**
     * The onFocus handler, provided by asField
     * @type {Function}
     */
    onFocus: PropTypes.func.isRequired,
    /**
     * The blur handler, provided by asField
     * @type {Function}
     */
    onBlur: PropTypes.func.isRequired,
    /**
     * The onClick handler, provided by asField
     * @type {Array}
     */
    onClick: PropTypes.func.isRequired,
    /**
     * The function to set the ref, provided by asField
     * @type {Array}
     */
    setRef: PropTypes.func.isRequired,
    /**
     * Gets the value of the field (useful for wrapped components, but not here)
     * @type{Function}
     */
    getValue: PropTypes.func.isRequired,
    /**
     * Sets the value of the field (useful for wrapped components, but not here)
     * @type{Function}
     */
    setValue: PropTypes.func.isRequired,

    /**
     * Required user props
     */
    type: PropTypes.oneOf(['select', 'textarea', ...INPUT_TYPES]).isRequired,
    /**
     * If you do not pass a name, then the field will not register with the form. This
     * is a nice escape-hatch to use form fields as controls. Make sure that you pass an `onChange`
     * callback.
     */
    name: PropTypes.string,

    /**
     * Optional User supplied props. These are handled if not shipped, so we can ignore them
     */

    /**
     * Children of the field
     *
     * @note this applies mostly to usage with buttons
     * @type {React.ReactNode}
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.arrayOf(PropTypes.element)]),
    /**
     * The label for the field
     * @type {String}
     */
    label: PropTypes.string,
    /**
     * A classname or set of classnames that have been joined with a space
     * @type {String}
     */
    className: PropTypes.string,
    /**
     * Whether or not a field is required.
     * @note this is `required` in browser context. You can also pass in a `required` function as
     *       a validator.
     * @type {Boolean}
     */
    required: PropTypes.bool,
    /**
     * An optional icon component to be merged in with the display
     * @type {React.ReactNode}
     */
    icon: PropTypes.element,
    /**
     * Options if this is a select field
     * @type {Object|Array}
     */
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), // eslint-disable-line
    /**
     * Any inline styles provided to the component
     * @type {Object}
     */
    style: PropTypes.object, // eslint-disable-line
  };

  maybeWrapInLabel(input: React.ReactNode) {
    const { className, icon, name, errors, type, label, style } = this.props;

    const spread = {} as { htmlFor?: string; style?: React.CSSProperties };
    if (name) {
      spread.htmlFor = name;
    }
    if (style) {
      spread.style = style;
    }

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <label
        className={classes([
          'sf--field',
          `sf--type-${type}`,
          errors.length !== 0 && `sf--has-errors`,
          icon && 'sf--has-icon',
          className,
        ])}
        {...spread}
      >
        <span>
          <span className="sf--label">{label && label}</span>
          {input}
          <span className="sf--icon">{icon && icon}</span>
          <span className="sf--errors">
            {errors.filter(Boolean).map((err: string) => (
              <span key={err} className="sf--error">
                {err}
              </span>
            ))}
          </span>
        </span>
      </label>
    );
  }
  /* eslint-enable jsx-a11y/label-has-for */

  renderField() {
    const {
      type, // we switch on this and send it to `input`
      setRef, // sets the ref in the HOC
      errors, // HOC's state.errors, gets sent to a different method, but we'll ignore it here
      label, // gets sent to a different method, but we'll ignore it here
      isValid, // gets sent to a different method, but we'll ignore it here
      className, // gets sent to a different method, but we'll ignore it here
      options, // valid for selects
      children,
      icon,
      getValue, // we're just going to ignore this
      setValue, // we're just going to ignore this
      ...spreadProps // the rest of everything that we need to send on
    } = this.props;

    if (!spreadProps.id && spreadProps.name && type !== 'radio') {
      spreadProps.id = spreadProps.name;
    }

    /**
     * This is an experiment. The input event seems to run faster than the change event, but react
     * complains if we don't pass onChange, so we'll send a noop function. We're making the
     * optimization for text fields only.
     *
     * @see  Some discussion https://github.com/facebook/react/issues/3964
     */
    if (type === 'text') {
      spreadProps.onInput = spreadProps.onChange;
      spreadProps.onChange = noop; // React complains if there is no `onChange` method
      return <input ref={setRef} type={type} {...spreadProps} />;
    }

    if (type === 'button') {
      // We do not wrap buttons in labels. So, give them a class.
      return children ? (
        <button
          ref={setRef}
          type="button"
          className={classes(['sf--field', 'sf--type-button', className])}
          {...spreadProps}
        >
          {children}
        </button>
      ) : (
        <button
          ref={setRef}
          type="button"
          className={classes(['sf--field', 'sf--type-button', className])}
          {...spreadProps}
        >
          {spreadProps.value}
        </button>
      );
    }

    // Make sure we add a ref and a className to the unwrapped element
    if (type === 'submit' || type === 'reset') {
      return <input type={type} ref={setRef} className={classes(['sf--field', className])} {...spreadProps} />;
    }

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

    /* eslint-disable react/no-danger */
    return <span dangerouslySetInnerHTML={{ __html: `<!-- Unsupported Field Type (${type}) -->` }} />;
    /* eslint-disable react/no-danger */
  }

  render() {
    // Hidden fields are never wrapped in labels
    if (noWrap.includes(this.props.type)) {
      return this.renderField();
    }
    return this.maybeWrapInLabel(this.renderField());
  }
}

export default asField(Field);
