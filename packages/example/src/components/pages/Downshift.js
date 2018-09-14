import React, { PureComponent } from 'react';
import { asField } from '@swan-form/field';
import { classes, hasOwnProperty } from '@swan-form/helpers';
import { hot } from 'react-hot-loader';
import Downshift from 'downshift';
import memoize from 'lodash/memoize';
import clamp from 'lodash/clamp';
import VirtualList from 'react-tiny-virtual-list';

import fuzzy from './fuzzy';

import styles from './Downshift.scss';

const mfuzzy = memoize(fuzzy);

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

const getItem = (item, getItemProps, index, highlightedIndex, selectedItem) => (
  <li
    {...getItemProps({
      key: item.original.value,
      index,
      item: item.original,
      className: classes(highlightedIndex === index && styles.highlighted, selectedItem === item && styles.selected),
    })}
  >
    {item.string}
  </li>
);

const mGetItem = memoize(getItem);

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

const fuzzyOpts = { extract: item => item.value };

function advancedFilter(theItems, value) {
  return value ? fuzzy(value, theItems, fuzzyOpts) : theItems;
}

class SelectDownshift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.options,
    };
  }

  handleStateChange = changes => {
    if (changes.hasOwnProperty('inputValue')) {
      const { inputValue } = changes;
      const items = advancedFilter(this.props.options, inputValue);
      this.setState({ inputValue, items });
    }
  };

  render() {
    const { label, errors, setValue, value, icon, filter } = this.props;

    const { items } = this.state;

    return (
      <>
        <Downshift
          onChange={loftValue(setValue)}
          defaultInputValue={value}
          defaultSelectedItem={value && { value }}
          itemToString={itemToString}
          onStateChange={this.handleStateChange}
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
              {/* <ul {...getMenuProps()} className={classes(styles.dropdown, isOpen && styles.isOpen)}> */}
              {isOpen && items.length ? (
                <VirtualList
                  width="calc(100% + 2rem)"
                  scrollToIndex={highlightedIndex || 0}
                  scrollToAlignment="auto"
                  height={20 + clamp(items.length, 0, 4) * 40}
                  itemCount={clamp(items.length, 0, 4)}
                  itemSize={40}
                  className={styles.dropdown}
                  renderItem={({ index, style }) => (
                    <div
                      key={items[index].original ? items[index].original.value : items[index].value}
                      className={classes(
                        styles.item,
                        highlightedIndex === index && styles.highlighted,
                        selectedItem === (items[index].original || items[index]) && styles.selected,
                      )}
                      {...getItemProps({ item: items[index].original || items[index], index, style })}
                    >
                      {items[index].original ? items[index].string : items[index].label}
                    </div>
                  )}
                />
              ) : null}
              {/* </ul> */}
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
  }
}

const Select = asField(SelectDownshift);

const random = [
  'alcohol bureau',
  'all about eve',
  'abbot and costello',
  'any beehive custom',
  'alcoholic better can-do',
  'as easy as abc',
  'abc',
];

class DownshiftExample extends PureComponent {
  render() {
    return (
      <>
        <Select options={normalizeOptions(items)} label="Please enter a fruit" value="kiwi" />
        <Select options={normalizeOptions(states)} label="Please enter a state" value="NY" />
        <Select options={normalizeOptions(random)} label="Random things" />
      </>
    );
  }
}

export default hot(module)(DownshiftExample);
