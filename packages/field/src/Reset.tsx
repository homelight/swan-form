import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface ResetProps {
  name: string;
  value: string;
  resetFunction?(): void;
  className?: string;
}

export default class Reset extends React.Component<ResetProps> {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    resetFunction: PropTypes.func, // eslint-disable-line
    className: PropTypes.string,
  };

  static contextTypes = {
    reset: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 'Reset',
    name: 'sf--reset',
    className: '',
  };

  render() {
    const { className, name, value } = this.props;
    return <Field type="reset" name={name} value={value} className={classes(['sf--reset', className])} />;
  }
}
