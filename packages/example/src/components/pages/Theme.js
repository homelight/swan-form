import React, { Component } from 'react';
import { Field, Radios } from '@swan-form/field';
import { classes } from '@swan-form/helpers';
import { hot } from 'react-hot-loader';
import styles from './Theme.scss';

// https://material.io/design/components/text-fields.html
class Theme extends Component {
  render() {
    return (
      <div>
        <Field type="text" name="username" label="Username*" value="" className={styles.theme} required />
        <Field type="text" name="test-field" label="Testing" value="" className={styles.theme} />
        <Field type="text" name="test-field2" label="Testing" value="" className={styles.underline} size={100} />
        <Radios
          name="radio-testing"
          type="radios"
          options={[{ label: 'First', value: 'first' }, { label: 'Second', value: 'second' }]}
          className={styles.theme}
          defaultValue={'second'}
        />

        <Radios
          name="radio-testing2"
          type="radios"
          options={[{ label: 'First', value: 'first' }, { label: 'Second', value: 'second' }]}
          className={classes([styles.theme, styles.inline])}
        />

        <Radios
          name="radio-testing3"
          type="radios"
          options={[{ label: 'First', value: 'first' }, { label: 'Second', value: 'second' }]}
          className={classes([styles.theme, styles.inline])}
          disabled
          defaultValue="second"
        />

        <Field name="checkbox1" type="checkbox" value="something" className={styles.theme} label="Checkbox 1" />
        <Field name="checkbox2" type="checkbox" value="something" className={styles.theme} label="Checkbox 2" />
        <Field
          name="checkbox3"
          type="checkbox"
          value="something"
          className={styles.theme}
          label="Checkbox 3"
          disabled
        />

        <Field
          name="checkbox4"
          type="checkbox"
          value="something"
          label="Checkbox 4"
          className={classes([styles.theme, styles.inline])}
        />
        <Field
          name="checkbox5"
          type="checkbox"
          value="something"
          label="Checkbox 5"
          className={classes([styles.theme, styles.inline])}
        />
        <Field
          name="checkbox6"
          type="checkbox"
          value="something"
          label="Checkbox 6"
          className={classes([styles.theme, styles.inline])}
          disabled
        />
        <Field
          name="checkbox7"
          type="checkbox"
          value="something"
          label="Checkbox 7"
          className={classes([styles.theme, styles.inline])}
          disabled
          defaultChecked
        />

        <Field
          name="switch1"
          type="checkbox"
          value="something"
          label="Switch 1"
          className={classes([styles.switch])}
          defaultChecked
        />

        <Field name="switch2" type="checkbox" value="something" label="Switch 2" className={classes([styles.switch])} />

        <Field
          name="switch3"
          type="checkbox"
          value="something"
          label="Switch 3"
          className={classes([styles.switch])}
          disabled
          defaultChecked
        />

        <Field
          name="switch4"
          type="checkbox"
          value="something"
          label="Switch 4"
          className={classes([styles.switch])}
          disabled
        />
      </div>
    );
  }
}

export default hot(module)(Theme);
