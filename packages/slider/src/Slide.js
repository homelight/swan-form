import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { classes, moveCursor } from '@swan-form/helpers';

const alwaysTrue = () => true;

export default class Slide extends PureComponent {
  static propTypes = {
    /**
     * Regular react children.
     * Note: do not use this with a `render` prop (as the children will be ignored)
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.string]),
    /**
     * A className to put on the slide
     */
    className: PropTypes.string,
    /**
     * If there is a <Field /> on the slide, then whether autoFocus the first one
     */
    autoFocus: PropTypes.bool,
    /**
     * Function that determines if the slide will show or be skipped; not used internally, but
     * used by the Slider component
     */
    shouldShowIf: PropTypes.func, // eslint-disable-line
    /**
     * A render prop, which gets called by the <Slider /> component
     * Note: do not use with children as the children will be ignored
     */
    render: PropTypes.func, // eslint-disable-line
  };

  static defaultProps = {
    className: '',
    autoFocus: true,
    children: null,
    shouldShowIf: alwaysTrue,
  };

  static contextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
  };

  static childContextTypes = {
    registerField: PropTypes.func,
    unregisterField: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.fields = {};
  }

  getChildContext() {
    // We need to intercept the register field context hook that the Form component so that we can
    // test that all the fields are valid before moving on to the next slide.
    return {
      registerField: this.registerField,
      unregisterField: this.unregisterField,
    };
  }

  componentDidMount() {
    this.maybeAutoFocus();
  }

  registerField = ({ name, getRef, getValue, setValue, validate, reset, isValid }) => {
    if (isFunction(this.context.registerField)) {
      this.context.registerField({ name, getRef, getValue, setValue, validate, reset });
    }
    this.fields = {
      ...this.fields,
      [name]: {
        isValid,
        validate,
        getRef,
      },
    };
  };

  unregisterField = name => {
    if (isFunction(this.context.unregisterField)) {
      this.context.unregisterField(name);
    }
    const { [name]: removed, ...remaining } = this.fields;
    this.fields = remaining;
  };

  maybeAutoFocus = () => {
    if (this.props.autoFocus) {
      const fieldNames = Object.keys(this.fields);
      if (fieldNames.length > 0) {
        // Get the element of the first field
        const firstField = this.fields[fieldNames[0]].getRef();
        // We need to push this top the next cycle in the event loop; otherwise we focus before
        // it fully renders (which means, nothing actually happens).
        if (firstField) {
          setTimeout(() => {
            // Call `focus` on the first field that we have
            firstField.focus();
            // Move the cursor to the end of the field
            moveCursor(firstField);
          }, 0);
        }
      }
    }
  };

  /**
   * Checks whether all registered fields on the slide are valid (they pass `validate` functions).
   *
   * @return {Boolean} [description]
   */
  isValid = () =>
    Object.keys(this.fields)
      .map(field => {
        // Get the validity from the registered field
        const fieldIsValid = this.fields[field].isValid();
        if (!fieldIsValid) {
          // Make the errors appear
          this.fields[field].validate();
        }
        // Return the slide's validity to the slider
        return fieldIsValid;
      })
      .filter(x => x === false).length === 0;

  render() {
    return <div className={classes([this.props.className, 'sf--slide'])}>{this.props.children}</div>;
  }
}
