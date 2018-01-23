import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import classes from '@flow-form/helpers/dist/classes';

export default class Reset extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    resetFunction: PropTypes.func, // eslint-disable-line
    className: PropTypes.string,
  };

  static defaultProps = {
    value: 'Reset',
    name: 'flowform--reset',
    className: '',
  };

  static contextTypes = {
    reset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    if (isFunction(this.props.resetFunction)) {
      this.props.resetFunction();
    } else if (isFunction(this.context.reset)) {
      this.context.reset();
    } else {
      console.error(
        'There was no reset function supplied to the reset input on either props or context.',
      );
    }
  }

  render() {
    const { className, name, value } = this.props;
    return (
      <input
        className={classes(['flowform--reset', className])}
        type="reset"
        name={name}
        value={value}
        onClick={this.resetForm}
      />
    );
  }
}
