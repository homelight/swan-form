import * as React from 'react';
import * as PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import { classes } from '@swan-form/helpers';

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

  resetForm = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFunction(this.props.resetFunction)) {
      this.props.resetFunction();
    } else if (isFunction(this.context.reset)) {
      this.context.reset();
    } else {
      /* eslint-disable no-console */
      console.error('There was no reset function supplied to the reset input on either props or context.');
      /* eslint-enable no-console */
    }
  };

  render() {
    const { className, name, value } = this.props;
    return (
      <input
        className={classes(['sf--reset', className])}
        type="reset"
        name={name}
        value={value}
        onClick={this.resetForm}
      />
    );
  }
}
