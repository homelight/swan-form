import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface SubmitProps {
  className?: string;
  name?: string;
  value?: string;
  style?: React.CSSProperties;
}

const emptyObject = {};

export default class Submit extends React.PureComponent<SubmitProps, {}> {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
  };

  static displayName = 'Submit';

  render() {
    const { className = '', name = 'sf--submit', style = emptyObject, value = 'Submit' } = this.props;
    return <Field name={name} type="submit" className={classes('sf--submit', className)} value={value} style={style} />;
  }
}
