import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import isFunction from 'lodash/isFunction';
import { Form } from '@flow-form/form';
import autobind from '@flow-form/helpers/dist/autobind';
import classes from '@flow-form/helpers/dist/classes';
import Slide from './Slide';

import './Slider.css';

// this is a real dumb function. find a better way to do this
function getPosition(slide, index) {
  if (slide === index) {
    return 'current';
  }
  if (slide > index) {
    return 'before';
  }
  return 'after';
}

// temp function; @todo fix the `Form` component so that it accepts handlers
const onSubmit = values => console.log(values);
const chevron = (size, rotation, color = '#000') => (
  <svg
    style={{
      width: size,
      height: size,
      transform: `rotate(${rotation}deg)`,
    }}
    viewBox="0 0 24 24"
  >
    <path fill={color} d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
);

const nextChevron = chevron('24px', 0);
const prevChevron = chevron('24px', 180);

export default class Slider extends Component {
  static propTypes = {
    height: PropTypes.string,
    current: PropTypes.number,
    onSubmit: PropTypes.func,
    beforeSubmit: PropTypes.func,
    slides: PropTypes.array.isRequired,
    prevButton: PropTypes.element, // eslint-disable-line
    nextButton: PropTypes.element, // eslint-disable-line
  };

  static defaultProps = {
    height: '500px',
    current: 0,
  };

  static childContextTypes = {
    registerSlide: PropTypes.func,
    unregisterSlide: PropTypes.func,
    // implement a reset method that will push the slider back to 0 and reset
    // the forms (or call the form context) if a <input type='reset' /> is pressed
  };

  constructor(props) {
    super(props);
    if (!Array.isArray(props.slides) || props.slides.length < 1) {
      /* eslint-disable no-console */
      console.error(`You must pass an array of slides.`);
      /* eslint-enable no-console */
    }
    this.state = {
      current: clamp(props.current, 0, props.slides.length) || 0,
    };

    // Cache the style object so we can reuse it to avoid rerenders.
    this.height = { height: props.height };
    this.slides = {};

    autobind(this, ['registerSlide', 'unregisterSlide', 'prev', 'next']);
  }

  getChildContext() {
    return {
      registerSlide: this.registerSlide,
      unregisterSlide: this.unregisterSlide,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state.current !== nextState.current;
  }

  componentWillUpdate(nextProps) {
    // If the height changes, then we will have to change the style object
    if (nextProps.height !== this.props.height) {
      this.height = { height: nextProps.height };
    }
  }

  registerSlide({ index, isValid }) {
    this.slides = Object.assign({}, this.slides, { [index]: isValid });
    // not quite adequate....
    // this.slides = [...this.slides, ref];
  }

  unregisterSlide(index) {
    const { [index]: remove, ...remaining } = this.slides;
    this.slides = remaining;
  }

  moveTo(index) {
    this.setState(prevState => ({
      ...prevState,
      current: index,
    }));
  }

  prev() {
    this.moveTo(this.findPrevSlide());
  }

  next() {
    if (isFunction(this.slides[this.state.current]) && this.slides[this.state.current]()) {
      this.moveTo(this.findNextSlide());
    }
  }

  change(val) {
    this.setState(prevState => ({
      ...prevState,
      current: clamp(prevState.current + val, 0, this.props.slides.length - 1),
    }));
  }

  findNextSlide() {
    const { current } = this.state;
    for (let i = current + 1; i < this.props.slides.length - 1; i++) {
      if (isFunction(this.props.slides[i].shouldShowIf)) {
        if (this.props.slides[i].shouldShowIf()) {
          return i;
        }
      } else {
        return i;
      }
    }
    // somehow, we're done.
    // so, we should do a form submit?
    // For now, we'll just move to the last slide, regardless.
    return this.props.slides.length - 1;
  }

  findPrevSlide() {
    const { current } = this.state;
    for (let i = current - 1; i >= 0; i--) {
      if (isFunction(this.props.slides[i].shouldShowIf)) {
        if (this.props.slides[i].shouldShowIf()) {
          return i;
        }
      } else {
        return i;
      }
    }
    // somehow, we're done.
    // so, we should do a form submit?
    // For now, we'll just move to the first slide, regardless.
    return 0;
  }

  render() {
    const { prevButton, nextButton } = this.props;
    return (
      <div className="ff--slider" style={this.height}>
        <div
          onClick={this.prev}
          className={classes([
            'ff--slider--control',
            'ff--slider--control--left',
            this.state.current === 0 && 'ff--slider--control--disabled',
          ])}
        >
          {prevButton ? <prevButton /> : prevChevron}
        </div>
        <div
          onClick={this.next}
          className={classes([
            'ff--slider--control',
            'ff--slider--control--right',
            this.state.current === this.props.slides.length - 1 && 'ff--slider--control--disabled',
          ])}
        >
          {nextButton ? <nextButton /> : nextChevron}
        </div>
        <Form
          name="slider-form"
          onSubmit={this.props.onSubmit}
          beforeSubmit={this.props.beforeSubmit}
        >
          {this.props.slides.map((slide, index) => (
            <Slide
              key={index}
              shouldShowIf={isFunction(slide.shouldShowIf) ? slide.shouldShowIf : () => true}
              index={index}
              position={getPosition(this.state.current, index)}
            >
              {slide.render()}
            </Slide>
          ))}
        </Form>
      </div>
    );
  }
}
