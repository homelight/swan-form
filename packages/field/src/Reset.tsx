import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface ResetProps {
  className?: string;
  name?: string;
  value?: string;
  style?: React.CSSProperties;
}

const emptyObject = {};

export default class Reset extends React.Component<ResetProps> {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    resetFunction: PropTypes.func, // eslint-disable-line
    className: PropTypes.string,
  };

  static displayName = 'Reset';

  render() {
    const { className = '', name = 'sf--reset', style = emptyObject, value = 'Reset' } = this.props;
    return <Field type="reset" name={name} value={value} className={classes('sf--reset', className)} />;
  }
}
