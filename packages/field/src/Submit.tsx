import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface SubmitProps {
  className?: string | null;
  name?: string | null;
  value?: string | null;
  style?: React.CSSProperties | null;
}

const emptyObject = {};

const Submit: React.SFC<SubmitProps> = ({ className, name, style, value }) => (
  <Field name={name} type="submit" className={classes('sf--submit', className)} value={value} style={style} />
);

Submit.displayName = 'Submit';

Submit.defaultProps = { name: 'sf--submit', value: 'Submit', className: '', style: emptyObject };

Submit.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
};

export default Submit;
