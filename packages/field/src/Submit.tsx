import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export default class Submit extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    name: 'sf--submit',
    className: '',
    value: 'Submit',
  };

  render() {
    const { className, name, value } = this.props;
    return (
      <Field
        className={classes(['sf--submit', className])}
        type="submit"
        name={name}
        value={value}
      />
    );
  }
}
