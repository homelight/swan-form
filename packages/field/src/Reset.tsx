import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import { Field } from './Field';

export interface ResetProps {
  className?: string;
  name?: string;
  value?: string | null;
  style?: React.CSSProperties;
}

const emptyObject = {};

export const Reset: React.SFC<ResetProps> = ({
  className,
  name = 'sf--reset',
  style = emptyObject,
  value = 'reset',
}) => <Field name={name} type="reset" className={classes('sf--reset', className)} value={value} style={style} />;

Reset.displayName = 'Reset';

Reset.defaultProps = {
  className: '',
  name: 'sf--reset',
  style: emptyObject,
  value: 'Reset',
};

Reset.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  value: PropTypes.string,
};

export default Reset;
