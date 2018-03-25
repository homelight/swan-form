/**
 * @todo add in slide hooks
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import isFunction from 'lodash/isFunction';
import invariant from 'invariant';
import { Form } from '@flow-form/form';
import { classes } from '@flow-form/helpers';

import Slide from './Slide';

// function getPosition(slide, index) {
//   return slide === index ? 0 : slide < index ? -1 : 1; // eslint-disable-line
// }

export default class Slider extends PureComponent {
  static propTypes = {
    /**
     * The slide to start on
     */
    current: PropTypes.number,
    /**
     * Turn on/off autocomplete for the form
     */
    autoComplete: PropTypes.oneOf(['on', 'off']),
    /**
     * A className or classNames to pass to the slider
     */
    className: PropTypes.string, // eslint-disable-line
    /**
     * The slides. These should only be of type <Slide />
     */
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
    /**
     * A button to use as a previous button
     */
    PrevButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * A button to use as a next button
     */
    NextButton: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * The beforSubmit hook to pass to the form
     */
    beforeSubmit: PropTypes.func,
    /**
     * The submit handler to pass to the form
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * The afterSubmit hook to pass to the form
     */
    afterSubmit: PropTypes.func,
    /**
     * Common Props are passed to every slide
     */
    commonProps: PropTypes.object, // eslint-disable-line
    /**
     * The name of the form in the slider
     */
    formName: PropTypes.string,
  };

  static defaultProps = {
    current: 0,
    autoComplete: 'off',
    PrevButton: '←',
    NextButton: '→',
    beforeSubmit: values => Promise.resolve(values),
    afterSubmit: values => Promise.resolve(values),
    commonProps: {},
    formName: 'slider-form',
  };

  static childContextTypes = {
    registerForm: PropTypes.func,
    unregisterForm: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.form = {};
    this.state = {
      current: clamp(props.current, 0, React.Children.count(props.children)) || 0,
      previous: null,
    };
  }

  getChildContext() {
    return {
      registerForm: this.registerForm,
      unregisterForm: this.unregisterForm,
    };
  }

  componentDidMount() {
    // The slider's children should be only slides... Otherwise, we're going to throw a hissy fit
    React.Children.forEach(this.props.children, child => {
      invariant(
        child.type === Slide,
        'A <Slider> component can have children only of the type Slide. Please check the render ' +
          'method that uses Slider.',
      );
    });
  }

  componentDidUpdate(prevProps) {
    // Since we're using indices to keep track of progress, we _could_ get off track if one
    // disappears, so we're going to disallow dynamically manipulating the children
    invariant(
      React.Children.count(this.props.children) === React.Children.count(prevProps.children),
      'Dynamically adding or removing slides is not supported. This may result in advancing to ' +
        'the wrong slides. Check the render method that uses <Slider />',
    );
  }

  getChildren = () => React.Children.toArray(this.props.children);

  getFormValues = () => (this.form && isFunction(this.form.getValues) ? this.form.getValues() : {});

  setCurrentSlideRef = el => {
    this.current = el;
  };

  registerForm = ({ name, getValues, submit }) => {
    this.form = { name, getValues, submit };
  };

  unregisterForm = name => {
    if (this.form.name === name) {
      this.form = {};
    }
  };

  moveTo = current =>
    this.setState(prevState => ({ ...prevState, current, previous: prevState.current }));

  next = () => {
    if (this.current && isFunction(this.current.isValid) && this.current.isValid()) {
      this.moveTo(this.findNext());
    }
  };

  prev = () => this.moveTo(this.findPrev());

  /**
   * Finds the index of the next viable previous slide
   *
   * @note  if nothing is available, then it defaults to `0`, i.e. the first slide declared as a
   *        child. The first child should be able to be shown regardless of what the decision tree
   *        is like.
   *
   * @memberof Slider
   */
  findNext = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};
    const length = children.length; // eslint-disable-line
    for (let i = current + 1; i <= length - 1; i++) {
      const slide = children[i];

      const { shouldShowIf } = slide.props;
      if (isFunction(shouldShowIf)) {
        if (shouldShowIf(formValues)) {
          return i;
        }
      } else {
        return i;
      }

      // No valid candidate for next slide, so we test the next
    }

    // If we're here, it means that we didn't find a valid candidate, so we're going to submit the
    // form.
    this.form.submit();
    return length - 1;
  };

  /**
   * Finds the index of the next viable previous slide
   *
   * @note  if nothing is available, then it defaults to `0`, i.e. the first slide declared as a
   *        child. The first child should be able to be shown regardless of what the decision tree
   *        is like.
   *
   * @memberof Slider
   */
  findPrev = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};

    const length = children.length; // eslint-disable-line
    for (let i = current - 1; i >= 0; i--) {
      const slide = children[i];

      const { shouldShowIf } = slide.props;
      if (isFunction(shouldShowIf)) {
        if (shouldShowIf(formValues)) {
          return i;
        }
      } else {
        return i;
      }

      // No valid candidate for next slide, so we test the next
    }

    // If we're here, it means that we need to show the first
    return 0;
  };

  /**
   * These are the "Props" that get passed to each slide.
   *
   * We're holding this as a class property so it's reused across renders, allowing for
   * PureComponents to rerender less often.
   *
   * @memberof Slider
   */
  mapSlideProps = {
    getFormValues: this.getFormValues,
    nextSlide: this.next,
    prevSlide: this.prev,
    ref: this.setCurrentSlideRef,
    ...this.props.commonProps,
  };

  render() {
    const {
      className,
      formName,
      PrevButton,
      NextButton,
      onSubmit,
      afterSubmit,
      beforeSubmit,
      autoComplete,
    } = this.props;

    // Get the current slide that we're on
    const { current } = this.state;
    // React children as an array
    const children = this.getChildren();
    // The current slide
    const slide = children[current];
    // Possible render prop on the slide
    const { render } = slide.props;
    // Classes applied to left control
    const leftClasses = classes(['ff--slider-control', 'ff--slider-control-left']);
    // Classes applied to the right control
    const rightClasses = classes(['ff--slider-control', 'ff--slider-control-left']);

    return (
      <div className={classes(['ff--slider', className])}>
        <button className={leftClasses} disabled={current === 0} onClick={this.prev}>
          {PrevButton}
        </button>
        <button className={rightClasses} onClick={this.next}>
          {NextButton}
        </button>
        <Form
          name={formName}
          onSubmit={onSubmit}
          beforeSubmit={beforeSubmit}
          afterSubmit={afterSubmit}
          autoComplete={autoComplete}
          keepUnmountedFieldValues
        >
          {isFunction(render) ? (
            <Slide ref={this.setCurrentSlideRef} {...slide.props}>
              {render(this.mapSlideProps)}
            </Slide>
          ) : (
            React.cloneElement(slide, this.mapSlideProps)
          )}
        </Form>
      </div>
    );
  }
}
