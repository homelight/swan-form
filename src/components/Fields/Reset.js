import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import isFunction from '../../helpers/isFunction';

export default class Reset extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    resetFunction: PropTypes.func,
  };

  static defaultProps = {
    value: 'Reset',
    name: 'flowform--reset',
  };

  static contextTypes = {
    reset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm(event) {
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
    const { name, value } = this.props;
    return (
      <input
        type="reset"
        name={name || 'flowform--reset'}
        value={value || 'Reset'}
        onClick={this.resetForm}
      />
    );
  }
}
