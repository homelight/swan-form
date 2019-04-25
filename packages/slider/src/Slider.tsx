import * as React from 'react';
import { Form } from '@swan-form/form';
import { classes, clamp, isFunction, execIfFunc, filterKeysFromObj } from '@swan-form/helpers';
import { SlideProps } from './Slide';

export type GenericObject = { [key: string]: any };

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  onSubmit(values: GenericObject | Promise<GenericObject>): Promise<GenericObject> | GenericObject;
  afterSubmit?(values: GenericObject | Promise<GenericObject>): any;
  beforeSubmit?(values: GenericObject | Promise<GenericObject>): Promise<GenericObject> | GenericObject;
  afterSlideChange?(): void;
  autoComplete?: boolean;
  common?: GenericObject;
  current?: number;
  defaultValues?: GenericObject;

  formName?: string;
  /**
   * Text for Prev Button (can be any React Node)
   * default: `←`
   */
  PrevButton?: React.ReactNode;
  /**
   * Text for Next Button (can be any React Node)
   * default: `→`
   */
  NextButton?: React.ReactNode;
  /**
   * Text for Finish Button (can be any React Node)
   * default: `→`
   */
  FinishButton?: React.ReactNode;
  /**
   * This will set a ref on the slider container
   */
  setRef?: (el: HTMLDivElement) => void;
}

export interface SliderState {
  current: number;
}

// Used as a fallback
const alwaysTrue = () => true;

export class Slider extends React.PureComponent<SliderProps, SliderState> {
  static displayName = 'Slider';

  static defaultProps = {
    autoComplete: 'off',
    afterSubmit: (values: object | Promise<object>) => Promise.resolve(values),
    beforeSubmit: (values: object | Promise<object>) => Promise.resolve(values),
    commonProps: {},
    current: 0,
    defaultValues: {},

    formName: 'slider-form',
    PrevButton: '←',
    NextButton: '→',
    FinishButton: '→',
  };

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      current: clamp(props.current || 0, 0, React.Children.count(props.children)) || 0,
    };
  }

  /**
   * These are the "Props" that get passed to each slide.
   */
  injectSlideProps = () => {
    return {
      common: this.props.common || {},
      getFormValues: this.getFormValues,
      nextSlide: this.next,
      prevSlide: this.prev,
      setRef: this.setCurrentSlideRef,
      currentSlideIndex: this.state.current,
      totalSlides: React.Children.count(this.props.children) || 0,
    };
  };

  // This is actually an instantiated slide
  currentSlide: any;

  /**
   * Ref to the form object
   */
  form: any;

  mounted: boolean;

  componentDidMount() {
    this.mounted = true;

    /**
     * Call any didEnter hooks on the first slide
     */
    const { didEnter, didEnterAsNext } = this.currentSlide.props;

    if (didEnterAsNext) {
      execIfFunc(didEnterAsNext, this.injectSlideProps());
      return;
    }

    if (didEnter) {
      execIfFunc(didEnter, this.injectSlideProps());
    }
  }

  componentDidUpdate(_: SliderProps, prevState: SliderState) {
    // Currently, we only do things here if the slide changed
    if (this.state.current === prevState.current) {
      return;
    }
    /**
     * Call any didEnter hooks on the individual slide
     */
    const { didEnter, didEnterAsPrev, didEnterAsNext } = this.currentSlide.props;
    if (prevState.current > this.state.current && didEnterAsPrev) {
      execIfFunc(didEnterAsPrev, this.injectSlideProps());
      return;
    }

    if (prevState.current < this.state.current && didEnterAsNext) {
      execIfFunc(didEnterAsNext, this.injectSlideProps());
      return;
    }

    if (didEnter) {
      execIfFunc(didEnter, this.injectSlideProps());
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Sets the ref on the form component
   */
  setFormRef = (el: any) => {
    this.form = el;
  };

  /**
   * Sets the ref for the current slide
   */
  setCurrentSlideRef = (el: any) => {
    this.currentSlide = el;
  };

  /**
   * Runs validation on the current slide
   */
  isCurrentSlideValid = async (): Promise<boolean> => {
    if (this.currentSlide && isFunction(this.currentSlide.isSlideValid)) {
      return this.currentSlide.isSlideValid();
    }
    return true;
  };

  /**
   * Gets the children as an array
   */
  // @ts-ignore: the typings for children don't allow this to work, but it does
  getChildren = () => React.Children.toArray<React.ReactElement<SlideProps>>(this.props.children);

  /**
   * Gets the form values from the form
   */
  getFormValues = () => (this.form && isFunction(this.form.getValues) ? this.form.getValues() : {});

  /**
   * Sets the state for the index of the current slider
   */
  moveTo = (slide: number) => {
    const { afterSlideChange } = this.props;

    if (this.mounted) {
      this.setState({ current: slide }, () => execIfFunc(afterSlideChange));
    }
  };

  /**
   * Public function to advance the slide
   */
  next = async () => {
    // If the current slide is not valid, do not proceed
    if (!(await this.isCurrentSlideValid())) {
      return;
    }

    // Grab the next viable slide index
    const nextSlideIndex = this.findNext();

    // If we are at the end, then handle the end state
    if (nextSlideIndex >= this.getChildren().length) {
      // Call the submit handler on the form
      if (this.form && isFunction(this.form.handleOnSubmit)) {
        execIfFunc(this.form.doSubmit);
      }
      return;
    }

    // Run any beforeExit* slide hooks that we find on the current slide slide
    // Slide hooks should be promises, and so we call the moveTo in the resolution
    const { beforeExit, beforeExitToNext } = this.currentSlide.props;

    if (isFunction(beforeExitToNext)) {
      beforeExitToNext(this.injectSlideProps()).then(() => this.moveTo(nextSlideIndex));
      return;
    }

    if (isFunction(beforeExit)) {
      beforeExit(this.injectSlideProps()).then(() => this.moveTo(nextSlideIndex));
      return;
    }

    // Just move to the next slide
    this.moveTo(this.findNext());
  };

  /**
   * Public function to retreat the slide
   */
  prev = () => {
    // Find the previous slide
    const prevSlideIndex = this.findPrev();

    // If it's the same, do nothing
    if (prevSlideIndex === this.state.current) {
      return;
    }

    // Call any beforeExit* slide hooks
    const { beforeExit, beforeExitToPrev } = this.currentSlide.props;

    if (isFunction(beforeExitToPrev)) {
      beforeExitToPrev(this.injectSlideProps()).then(() => this.moveTo(prevSlideIndex));
      return;
    }

    if (isFunction(beforeExit)) {
      beforeExit(this.injectSlideProps()).then(() => this.moveTo(prevSlideIndex));
      return;
    }

    // Just move to the previous slide
    this.moveTo(prevSlideIndex);
  };

  /**
   * Finds the next viable slide to move to
   */
  findNext = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};
    const length = children.length - 1;
    for (let index = current + 1; index <= length; index++) {
      const slide = children[index];
      const { shouldShowIf = alwaysTrue } = slide.props;
      if (shouldShowIf(formValues)) {
        return index;
      }
      // No valid candidate for next slide, so we test the next
    }

    // We moved through the `for` statement without finding a slide, so send a greater index, and allow the
    // `next` function to handle the end state.
    return length + 1;
  };

  /**
   * Finds the previous viable slide to move to
   */
  findPrev = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};
    for (let index = current - 1; index >= 0; index--) {
      const slide = children[index];
      const { shouldShowIf = alwaysTrue } = slide.props;

      if (shouldShowIf(formValues)) {
        return index;
      }
      // No valid candidate for next slide, so we test the next
    }

    // If we're here, it means that we need to show the first
    return 0;
  };

  /**
   * Handles the end state of the slider
   */
  handleEnd = () => {
    if (this.form) {
      execIfFunc(this.form.doSubmit);
    }
  };

  render() {
    const {
      className,
      formName,
      PrevButton,
      NextButton,
      FinishButton,
      onSubmit,
      afterSubmit,
      beforeSubmit,
      autoComplete,
      defaultValues,
      ...rest
    } = this.props;

    // Get the current slide that we're on
    const { current } = this.state;
    // React children as an array
    const children = this.getChildren();
    // The current slide
    const slide = children[current];
    // Classes applied to left control
    const leftClasses = classes(['sf--slider-control', 'sf--slider-control-left']);
    // Classes applied to the right control
    const rightClasses = classes(['sf--slider-control', 'sf--slider-control-right']);

    const isAtEnd = children.length - 1 === current;
    const nextFn = isAtEnd ? this.handleEnd : this.next;

    const removeProps = [
      'afterSlideChange' as 'afterSlideChange',
      'defaultFormValues' as 'defaultFormValues',
      'formAutoComplete' as 'formAutoComplete',
      'commonProps' as 'commonProps',
      'defaultValues' as 'defaultValues',
      'setRef' as 'setRef',
    ];

    const props = {
      ...filterKeysFromObj<typeof rest, typeof removeProps>(rest, removeProps),
      ...(isFunction(this.props.setRef) ? { ref: this.props.setRef } : {}),
    };

    return (
      <div {...props} className={classes('sf--slider', className)}>
        <button type="button" className={leftClasses} disabled={current === 0} onClick={this.prev}>
          {PrevButton}
        </button>
        <button type="button" className={rightClasses} onClick={nextFn}>
          {isAtEnd ? FinishButton : NextButton}
        </button>
        <Form
          name={formName!}
          onSubmit={onSubmit}
          beforeSubmit={beforeSubmit!}
          afterSubmit={afterSubmit!}
          autoComplete={autoComplete}
          persist
          defaultValues={defaultValues}
          ref={this.setFormRef}
        >
          {React.cloneElement(slide, this.injectSlideProps())}
        </Form>
      </div>
    );
  }
}

export default Slider;
