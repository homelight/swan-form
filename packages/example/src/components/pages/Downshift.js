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
    const { label, errors, setValue, value, icon, filter, style = {} } = this.props;

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
            <div className={styles.container} style={style}>
              <label {...getLabelProps()}>{label}</label>
              <input {...getInputProps()} style={{ width: '100%' }} />
              {getButton({ selectedItem, isOpen, getToggleButtonProps, clearSelection })}
              {/* <ul {...getMenuProps()} className={classes(styles.dropdown, isOpen && styles.isOpen)}> */}
              {isOpen && items.length ? (
                <VirtualList
                  width="calc(100% + 2rem)"
                  scrollToIndex={highlightedIndex || 0}
                  scrollToAlignment="auto"
                  height={20 + clamp(items.length, 0, 4) * 40}
                  itemCount={items.length}
                  itemSize={40}
                  className={classes(styles.dropdown, isOpen && styles.isOpen)}
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
  'grizzled heptad orchis',
  'dickens fizgig corgi',
  'laborer comedian esurient',
  'clearing boatyard vim',
  'mukluk champac cowbind',
  'pear furlough knack',
  'bedstead gasper sacker',
  'tympany patch economy',
  'masseter pruritus fluky',
  'baa purify brad',
  'embow invite monodic',
  'herein wiener stricken',
  'localism lens mordancy',
  'attain maidenly it',
  'dippy frown panda',
  'micelle adenoma canikin',
  'danseuse jot raddled',
  'vinyl untruth guano',
  'fathom leafage deer',
  'violable earplug seeing',
  'cud octuple hobnail',
  'forth grained headship',
  'pothole spur belong',
  'sapless shove lens',
  'spire nuptial razor',
  'ulema dago kelly',
  'lactate ham aglimmer',
  'uncut abound composer',
  'wards enervate outwards',
  'amoretto flunk bluebird',
  'tigerish sorn gumbotil',
  'turbojet kermes tamarisk',
  'gluteus touch scrub',
  'kickoff deferral accuracy',
  'sparker dilly casemate',
  'cowl pewee apiary',
  'gunlock bushman comrade',
  'beatific hesitate scalade',
  'wanting opossum squall',
  'murphy pyknic venture',
  'causeway netter camomile',
  'willing bay ream',
  'boxcar planking mudstone',
  'disdain emirate boogie',
  'keyboard velocity trestle',
  'whorish fewer marish',
  'monkey wrote jackeroo',
  'custos valiancy dobby',
  'thorns woollen yoghurt',
  'joke wheezy reindeer',
  'sanctity fount curiosa',
  'plectrum viable violable',
  'beggary ibex lode',
  'easiness requital abducens',
  'disagree vetiver hereto',
  'incident ant lacteal',
  'sybarite tombolo semen',
  'wrinkly tushy immunity',
  'poised blocking pentyl',
  'jota atomizer ebon',
  'shote denote gumbo',
  'mean dermoid vivisect',
  'shoon manners shiksa',
  'dyestuff unhandy sanguine',
  'sleety aye gauge',
  'camber jotter hallmark',
  'drill midmost knack',
  'boomkin dogfight titty',
  'defrost pled lecture',
  'could swollen gunfire',
  'tailwind shalloon unpaged',
  'hunch academy calendar',
  'yabber learned vas',
  'salad drivel mote',
  'currant hull suspend',
  'siding renin warn',
  'mustard liqueur white',
  'leaf negatron epidote',
  'confuse askew ovular',
  'porter hassle decurion',
  'kishke blotter messy',
  'roofer mightily fee',
  'misdo embower oilskin',
  'ternate planula sanctum',
  'peacock bullpen feather',
  'rotator whiskers knowing',
  'rustler cakewalk striate',
  'postfix grain lochia',
  'larch aspirant quality',
  'praxis grew cry',
  'aspen fusspot motel',
  'starry dammar checkup',
  'washing geode rococo',
  'decided mood evolve',
  'epos earache woofer',
  'punnet dumpish embassy',
  'illiquid aloe tittup',
  'torture nurture inurbane',
  'jarvey fallout varnish',
  'oriel diner memento',
];

class DownshiftExample extends PureComponent {
  render() {
    return (
      <>
        <Select options={normalizeOptions(items)} label="Please enter a fruit" value="kiwi" />
        <Select options={normalizeOptions(states)} label="Please enter a state" value="NY" />
        <Select options={normalizeOptions(random)} label="Random things" style={{ width: '20rem' }} />
      </>
    );
  }
}

export default hot(module)(DownshiftExample);
