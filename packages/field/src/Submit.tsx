import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import { default as Field } from './Field';

export interface SubmitProps {
  className?: string;
  name?: string;
  value?: string;
}

export default class Submit extends PureComponent<SubmitProps, {}> {
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
    return <Field className={classes(['sf--submit', className])} type="submit" name={name} value={value} />;
  }
}
