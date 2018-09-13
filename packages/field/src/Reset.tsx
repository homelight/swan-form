import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface ResetProps {
  className?: string | null;
  name?: string | null;
  value?: string | null;
  style?: React.CSSProperties | null;
}

const emptyObject = {};

const Reset: React.SFC<ResetProps> = ({ className, name, style, value }) => (
  <Field type="reset" name={name} value={value} className={classes('sf--reset', className)} style={style} />
);

Reset.displayName = 'Reset';

Reset.defaultProps = {
  className: '',
  name: 'sf--reset',
  value: 'Reset',
  style: emptyObject,
};

Reset.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
};

export default Reset;
