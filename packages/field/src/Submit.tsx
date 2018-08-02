import { default as React } from 'react';
import { default as PropTypes } from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface SubmitProps {
  className?: string;
  name?: string;
  value?: string;
}

export default class Submit extends React.PureComponent<SubmitProps, {}> {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps: Partial<SubmitProps> = {
    name: 'sf--submit',
    className: '',
    value: 'Submit',
  };

  render() {
    const { className = '', name = 'sf--submit', value = 'Submit' } = this.props;
    return <Field className={classes(['sf--submit', className])} type="submit" name={name} value={value} />;
  }
}
