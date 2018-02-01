import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import isFunction from 'lodash/isFunction';
import { Form } from '@flow-form/form';
import autobind from '@flow-form/helpers/dist/autobind';
import classes from '@flow-form/helpers/dist/classes';
import Slide from './Slide';
import { ENTER, TAB } from '@flow-form/helpers/dist/keyCodes';

/**
 * @TODO  the slider / slides need to be thought out better in terms of nesting forms as well
 *        as the actions taken in between slides. We need to have the option to dynamically
 *        resize these things. Optionally, we might consider redoing it so that we can have
 *        nested forms. Also, we need to fine a way to define a point of no return, as certain
 *        actions taken (say, submit mid-flow) and how to handle that.
 *
 * @NOTE  Another approach to this (needs perf testing) would be not to render the slides when
 *        they are off-screen. This would make it easier to pass props. Also, it seems that
 *        we're missing a good way to define state between the slides. Right now, this works
 *        well for simple forms or for asynchronous flows, but it's fragile. So, works in best
 *        case scenario, but not for others.
 */

// this is a real dumb function. find a better way to do this
function getPosition(slide, index) {
  if (slide === index) {
    return 'current';
  }
  if (slide > index) {
    return 'prev';
  }
  return 'next';
}

// temp function; @todo fix the `Form` component so that it accepts handlers
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
const alwaysTrue = () => true;

export default class Slider extends Component {
  static propTypes = {
    height: PropTypes.string,
    current: PropTypes.number,
    onSubmit: PropTypes.func.isRequired,
    beforeSubmit: PropTypes.func, // eslint-disable-line
    afterSubmit: PropTypes.func, // eslint-disable-line
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        render: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.node,
          PropTypes.element,
          PropTypes.string,
        ]).isRequired,
        shouldShowIf: PropTypes.func,
      }),
    ).isRequired,
    PrevButton: PropTypes.element, // eslint-disable-line
    NextButton: PropTypes.element, // eslint-disable-line
    autoComplete: PropTypes.oneOf(['on', 'off']),
    /**
     * If this object exists, all slides that are functions will be passed this object.
     * @type {Object}
     */
    slideProps: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    height: '500px',
    current: 0,
    autoComplete: 'off',
    slideProps: {},
  };

  static childContextTypes = {
    registerSlide: PropTypes.func,
    unregisterSlide: PropTypes.func,
    registerForm: PropTypes.func,
    unregisterForm: PropTypes.func,
    // @todo implement a reset method that will push the slider back to 0 and reset
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

    // Consider caching the this.props.slideProps or something.

    autobind(this, [
      'getFormValues',
      'registerSlide',
      'unregisterSlide',
      'registerForm',
      'unregisterForm',
      'prev',
      'next',
    ]);
  }

  getChildContext() {
    return {
      registerSlide: this.registerSlide,
      unregisterSlide: this.unregisterSlide,
      registerForm: this.registerForm,
      unregisterForm: this.unregisterForm,
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

  getFormValues() {
    if (this.form && isFunction(this.form.getValues)) {
      return this.form.getValues();
    }
    return {};
  }

  registerSlide({ index, isValid, beforeExitOnce }) {
    this.slides = {
      ...this.slides,
      [index]: {
        isValid,
        beforeExitOnce,
      },
    };
  }

  unregisterSlide(index) {
    const { [index]: remove, ...remaining } = this.slides;
    this.slides = remaining;
  }

  registerForm({ name, getValues, submit }) {
    this.form = { name, getValues, submit };
  }

  unregisterForm(name) {
    if (this.form.name === name) {
      this.form = {};
    }
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
    const slide = this.slides[this.state.current];
    if (slide && isFunction(slide.isValid) && slide.isValid()) {
      // Ill-conceived/partially finished hook implementation
      if (isFunction(slide.beforeExitOnce)) {
        const values = this.form ? this.form.getValues() : {};
        slide
          .beforeExitOnce(values)
          .then(() => {
            this.moveTo(this.findNextSlide());
          })
          // @TODO remove this and have better error handling / fewer errors
          .catch(console.error);
      } else {
        this.moveTo(this.findNextSlide());
      }
    }
  }

  findNextSlide() {
    const { current } = this.state;
    const formValues = this.form ? this.form.getValues() : {};
    const length = this.props.slides.length;
    for (let i = current + 1; i <= length - 1; i++) {
      const slide = this.props.slides[i];
      if (isFunction(slide.shouldShowIf)) {
        if (slide.shouldShowIf(formValues)) {
          return i;
        }
      } else {
        return i;
      }
    }
    this.form.submit();
    // somehow, we're done.
    // so, we should do a form submit?
    // For now, we'll just move to the last slide, regardless.
    return length - 1;
  }

  findPrevSlide() {
    const { current } = this.state;
    const formValues = this.form ? this.form.getValues() : {};
    for (let i = current - 1; i >= 0; i--) {
      if (isFunction(this.props.slides[i].shouldShowIf)) {
        if (this.props.slides[i].shouldShowIf(formValues)) {
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
    const {
      PrevButton,
      NextButton,
      slideProps,
      onSubmit,
      beforeSubmit,
      afterSubmit,
      autoComplete,
    } = this.props;

    return (
      <div className="ff--slider" style={this.height}>
        <button
          onClick={this.prev}
          className={classes([
            'ff--slider--control',
            'ff--slider--control--left',
            this.state.current === 0 && 'ff--slider--control--disabled',
          ])}
          disabled={this.state.current === 0}
        >
          {PrevButton || prevChevron}
        </button>
        <button
          onClick={this.next}
          className={classes(['ff--slider--control', 'ff--slider--control--right'])}
        >
          {NextButton || nextChevron}
        </button>
        <Form
          name="slider-form"
          onSubmit={this.props.onSubmit}
          beforeSubmit={this.props.beforeSubmit}
          afterSubmit={this.props.afterSubmit}
          autoComplete={this.props.autoComplete}
        >
          {this.props.slides.map((slide, index) => (
            <Slide
              key={slide.key || index}
              shouldShowIf={isFunction(slide.shouldShowIf) ? slide.shouldShowIf : alwaysTrue}
              index={index}
              position={getPosition(this.state.current, index)}
              getFormValues={this.getFormValues}
              slideProps={slideProps}
              afterSlide={slide.afterSlide}
              beforeExitOnce={slide.beforeExitOnce}
            >
              {isFunction(slide.render)
                ? slide.render({ getFormValues: this.getFormValues, ...slideProps })
                : slide.render}
            </Slide>
          ))}
        </Form>
      </div>
    );
  }
}
