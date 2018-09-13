import React, { PureComponent } from 'react';
import { asField } from '@swan-form/field';
import { classes, hasOwnProperty } from '@swan-form/helpers';
import { hot } from 'react-hot-loader';
import Downshift from 'downshift';
import memoize from 'lodash/memoize';

import styles from './Downshift.scss';

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'grape' },
  { value: 'banana' },
  'kiwi',
];

const Down = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Clear = () => (
  <svg viewBox="0 0 20 20" width="24" height="24" fill="none" stroke="black" strokeWidth="1">
    <path d="M6,6 L13,13" />
    <path d="M13,6 L6,13" />
  </svg>
);

const normalizeOption = option => {
  if (typeof option === 'string') {
    return { label: option, value: option };
  }
  if (typeof option === 'object') {
    if (!hasOwnProperty(option, 'label')) {
      return { ...option, label: option.value };
    }
  }
  return option;
};

const normalizeOptions = options => options.map(normalizeOption);

const getOptions = memoize(normalizeOptions);

const getItem = ({ getItemProps, item, index, highlightedIndex, selectedItem }) => (
  <li
    {...getItemProps({
      key: item.value,
      index,
      item,
      className: classes(highlightedIndex === index && styles.highlighted, selectedItem === item && styles.selected),
    })}
  >
    {item.value}
  </li>
);

const getButton = ({ getToggleButtonProps, isOpen, clearSelection, selectedItem }) =>
  selectedItem ? (
    <button type="button" onClick={clearSelection} className={styles.toggleButton}>
      <Clear />
    </button>
  ) : (
    <button {...getToggleButtonProps()} className={classes(styles.toggleButton, isOpen && styles.isOpen)}>
      <Down />
    </button>
  );

const itemToString = item => (item && item.value ? item.value : '');
const loftValue = fn => item => (item && item.value ? fn(item.value) : fn(item));

const states = [
  'AK',
  'AL',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

const SelectDownshift = props => {
  console.log(props);
  const { options: _options, label, errors, setValue, value, icon, filter } = props;

  const options = getOptions(_options);

  return (
    <>
      <Downshift
        onChange={loftValue(setValue)}
        defaultInputValue={value}
        defaultSelectedItem={value && { value }}
        itemToString={itemToString}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getToggleButtonProps,
          clearSelection,
        }) => (
          <div className={styles.container}>
            <label {...getLabelProps()}>{label}</label>
            <input {...getInputProps()} />
            {getButton({ selectedItem, isOpen, getToggleButtonProps, clearSelection })}
            <ul {...getMenuProps()} className={classes(styles.dropdown, isOpen && styles.isOpen)}>
              {isOpen
                ? options
                    .filter(item => !inputValue || item.value.includes(inputValue))
                    .map((item, index) => getItem({ getItemProps, item, index, highlightedIndex, selectedItem }))
                : null}
            </ul>
            <span className="sf--errors">
              {errors.map(error => (
                <span key={error} className="sf-error">
                  {error}
                </span>
              ))}
            </span>
          </div>
        )}
      </Downshift>
      <pre>Value: {JSON.stringify(value, null, 2)}</pre>
    </>
  );
};

const Select = asField(SelectDownshift);

class DownshiftExample extends PureComponent {
  render() {
    return <Select options={states} label="Please enter a fruit" value="NY" />;
  }
}

export default hot(module)(DownshiftExample);
