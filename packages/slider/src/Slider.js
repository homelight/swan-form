import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash/clamp';
import isFunction from 'lodash/isFunction';
import invariant from 'invariant';
import { Form } from '@swan-form/form';
import { classes } from '@swan-form/helpers';

import Slide from './Slide';

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

  constructor(props) {
    super(props);
    // this.form = {};
    this.state = {
      current: clamp(props.current, 0, React.Children.count(props.children)) || 0,
    };

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    // Since we're using indices to keep track of progress, we _could_ get off track if one
    // disappears, so we're going to disallow dynamically manipulating the children
    invariant(
      React.Children.count(this.props.children) === React.Children.count(prevProps.children),
      'Dynamically adding or removing slides is not supported. This may result in advancing to ' +
        'the wrong slides. Check the render method that uses <Slider />',
    );
    // Run any didEnter* slide hooks here
    const { didEnter, didEnterAsPrev, didEnterAsNext } = this.current.props;
    if (prevState.current > this.state.current) {
      if (isFunction(didEnterAsPrev)) {
        didEnterAsPrev(this.mapSlideProps);
      } else if (isFunction(didEnter)) {
        didEnter(this.mapSlideProps);
      }
    } else if (prevState.current < this.state.current) {
      if (isFunction(didEnterAsNext)) {
        didEnterAsNext(this.mapSlideProps);
      } else if (isFunction(didEnter)) {
        didEnter(this.mapSlideProps);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Convenience method to transform the Slider's children into an array
   * @return array array of React elements
   */
  getChildren = () => React.Children.toArray(this.props.children);

  /**
   * Gets the values of the slider form
   * @return object object of form values as { fieldName: fieldValue, ... }
   */
  getFormValues = () => (this.form && isFunction(this.form.getValues) ? this.form.getValues() : {});

  /**
   * Sets the current slide ref
   *
   * We use refs on the current slide so that we can avoid having to setup another
   * register/unregister pattern with slides. Since slides are only direct children, this pattern
   * will work fine.
   *
   * @return React.element
   */
  setCurrentSlideRef = el => {
    this.current = el;
  };

  setFormRef = el => {
    this.form = el;
  };

  moveTo = current => {
    if (this.mounted) {
      this.setState(prevState => ({ ...prevState, current }));
    }
  };

  next = () => {
    if (this.current && isFunction(this.current.isValid) && this.current.isValid()) {
      // Find the next slide index
      const nextSlideIndex = this.findNext();
      if (nextSlideIndex === this.state.current) {
        // We're not advancing, so the most likely cause is that we're at the last slide, in which
        // case, we need to call the submit handler on the form; however, we'll double-check that
        // we're actually on the last side first
        if (nextSlideIndex === this.getChildren().length - 1) {
          // Call the submit handler on the form
          if (this.form && isFunction(this.form.handleOnSubmit) && this.mounted) {
            this.form.handleOnSubmit();
          }
        }
        // We don't have an else path here, for the "not-the-last-slide" scenario.
      } else {
        // Slider hooks that can be supplied as functions on the slide
        // The way it works is, if there is a beforeExitToNext hook, we run that. If there
        // is also a beforeExit hook, then we skip that one (i.e. run the most granular only).
        // Each of these should return a promise, and, upon resolution, then transfer the slide.
        // This creates a potential for two things to go wrong:
        //   (1) if the function is slow, then the transition will appear laggy, so: optimize;
        //   (2) if the function does something that would somehow unmount the slider, then you'll
        //       open up potential memory leaks as we're still holding onto references in the
        //       slider in the promise resolution.
        // If there are no hooks defined on the slide, then we just transition to the next one.
        const { beforeExit, beforeExitToNext } = this.current.props;
        if (isFunction(beforeExitToNext)) {
          beforeExitToNext(this.mapSlideProps).then(() => {
            this.moveTo(nextSlideIndex);
          });
        } else if (isFunction(beforeExit)) {
          beforeExit(this.mapSlideProps).then(() => {
            this.moveTo(nextSlideIndex);
          });
        } else {
          // Update the state for the new slides
          this.moveTo(nextSlideIndex);
        }
      }
    }
    // If we don't activate the `if` statement, then we know that the slide wasn't in a valid state,
    // i.e. it has fields that do not fit the requirements, so, instead we'll do nothing here.
    // (The inline field validations will appear on the fields as an effect of calling "validate"
    // on them, so the user should get visible feedback as to what to do).
  };

  prev = () => {
    // The logic of the slide beforeExit slide hooks is basically the same as for the `next` method
    // that's just above. Refer to the inline comments above for a better explanation of what is
    // happening here.
    const prevSlideIndex = this.findPrev();
    if (prevSlideIndex !== this.state.current) {
      const { beforeExit, beforeExitToPrev } = this.current.props;
      if (isFunction(beforeExitToPrev)) {
        beforeExitToPrev(this.mapSlideProps).then(() => this.moveTo(prevSlideIndex));
      } else if (isFunction(beforeExit)) {
        beforeExit(this.mapSlideProps).then(() => this.moveTo(prevSlideIndex));
      } else {
        this.moveTo(prevSlideIndex);
      }
    }
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
  findNext = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};
    const length = children.length; // eslint-disable-line
    for (let i = current + 1; i <= length - 1; i++) {
      const slide = children[i];
      if (slide.props.shouldShowIf(formValues)) {
        return i;
      }
      // No valid candidate for next slide, so we test the next
    }

    // We moved through the `for` statement without finding a slide, so default to the last slide
    return length - 1;
  };

  /**
   * Finds the index of the next viable previous slide
   *
   * @note  if nothing is available, then it defaults to the last child. The last child should
   *        either respond well to this or should be always viewable.
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
      if (slide.props.shouldShowIf(formValues)) {
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
    const leftClasses = classes(['sf--slider-control', 'sf--slider-control-left']);
    // Classes applied to the right control
    const rightClasses = classes(['sf--slider-control', 'sf--slider-control-right']);

    return (
      <div className={classes(['sf--slider', className])}>
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
          ref={this.setFormRef}
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
