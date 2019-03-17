import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Field from './Field';

export interface SubmitProps {
  className?: string;
  name?: string;
  value?: string | null;
  style?: React.CSSProperties;
}

const emptyObject = {};

export const Submit: React.SFC<SubmitProps> = ({
  className,
  name = 'sf--submit',
  style = emptyObject,
  value = 'submit',
}) => <Field name={name} type="submit" className={classes('sf--submit', className)} value={value} style={style} />;

Submit.displayName = 'Submit';

Submit.defaultProps = { name: 'sf--submit', value: 'Submit', className: '', style: emptyObject };

Submit.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line
  value: PropTypes.string,
};

export default Submit;
