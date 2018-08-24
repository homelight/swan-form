import * as React from 'react';
import { clamp, isFunction } from 'lodash';
import { Form } from '@swan-form/form';
import { classes, execIfFunc } from '@swan-form/helpers';
import { SlideProps } from './Slide';

export interface SliderProps {
  formName?: string;
  current?: number;
  autoComplete?: boolean;
  className?: string;
  children: React.ReactNode;
  PrevButton?: React.ReactNode;
  NextButton?: React.ReactNode;
  FinishButton?: React.ReactNode;
  beforeSubmit?(values: { [key: string]: any } | Promise<{ [key: string]: any }>): Promise<{ [key: string]: any }>;
  onSubmit(values: { [key: string]: any } | Promise<{ [key: string]: any }>): Promise<{ [key: string]: any }>;
  afterSubmit?(values: { [key: string]: any } | Promise<{ [key: string]: any }>): Promise<{ [key: string]: any }>;
  common?: { [key: string]: any };
  defaultValues?: { [key: string]: any };
}

export interface SliderState {
  current: number;
}

const alwaysTrue = () => true;

export class Slider extends React.PureComponent<SliderProps, SliderState> {
  constructor(props: SliderProps) {
    super(props);
    // this.form = {};
    this.state = {
      current: clamp(props.current || 0, 0, React.Children.count(props.children)) || 0,
    };

    /**
     * These are the "Props" that get passed to each slide.
     *
     * We're holding this as a class property so it's reused across renders, allowing for
     * PureComponents to rerender less often.
     */
    this.injectSlideProps = {
      getFormValues: this.getFormValues,
      nextSlide: this.next,
      prevSlide: this.prev,
      setRef: this.setCurrentSlideRef,
      common: this.props.common!,
    };

    this.mounted = false;
  }

  static defaultProps = {
    autoComplete: 'off',
    afterSubmit: (values: object | Promise<object>) => Promise.resolve(values),
    beforeSubmit: (values: object | Promise<object>) => Promise.resolve(values),
    commonProps: {},
    current: 0,
    defaultValues: {},
    FinishButton: '→',
    formName: 'slider-form',
    NextButton: '→',
    PrevButton: '←',
  };

  static displayName = 'Slider';

  injectSlideProps: {
    getFormValues(): { [key: string]: any };
    nextSlide(): void;
    prevSlide(): void;
    setRef(el: any): void;
    common: { [key: string]: any };
  };

  // This is actually an instantiated slide
  currentSlide: any;
  // This is a ref to the form
  form: any;
  mounted: boolean;

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate(_: SliderProps, prevState: SliderState) {
    // Run any didEnter* slide hooks here
    const { didEnter, didEnterAsPrev, didEnterAsNext } = this.currentSlide.props;
    if (prevState.current > this.state.current && didEnterAsPrev) {
      return execIfFunc(didEnterAsPrev, this.injectSlideProps);
    }
    if (prevState.current < this.state.current && didEnterAsNext) {
      return execIfFunc(didEnterAsNext, this.injectSlideProps);
    }
    if (didEnter) {
      return execIfFunc(didEnter, this.injectSlideProps);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  setFormRef = (el: any) => {
    this.form = el;
  };

  setCurrentSlideRef = (el: any) => {
    this.currentSlide = el;
  };

  isCurrentSlideValid = () => {
    const { currentSlide } = this;
    return currentSlide && isFunction(currentSlide.isSlideValid) ? currentSlide.isSlideValid() : true;
  };

  getChildren = (): any => React.Children.toArray(this.props.children);

  getFormValues = () => (this.form && isFunction(this.form.getValues) ? this.form.getValues() : {});

  moveTo = (slide: number) => {
    if (this.mounted) {
      this.setState({ current: slide });
    }
  };

  next = () => {
    if (!this.isCurrentSlideValid()) {
      return;
    }

    const { current } = this.state;
    const nextSlideIndex = this.findNext();
    if (nextSlideIndex === this.getChildren().length && nextSlideIndex === current) {
      // Call the submit handler on the form
      if (this.form && isFunction(this.form.handleOnSubmit)) {
        return execIfFunc(this.form.doSubmit);
      }
      return;
    }

    const { beforeExit, beforeExitToNext } = this.currentSlide.props;
    if (isFunction(beforeExitToNext)) {
      return beforeExitToNext(this.injectSlideProps).then(() => {
        this.moveTo(nextSlideIndex);
      });
    }

    if (isFunction(beforeExit)) {
      return beforeExit(this.injectSlideProps).then(() => {
        this.moveTo(nextSlideIndex);
      });
    }

    return this.moveTo(this.findNext());
  };

  prev = () => {
    const prevSlideIndex = this.findPrev();
    if (prevSlideIndex === this.state.current) {
      return;
    }

    const { beforeExit, beforeExitToPrev } = this.currentSlide.props;
    if (isFunction(beforeExitToPrev)) {
      return beforeExitToPrev(this.injectSlideProps).then(() => this.moveTo(prevSlideIndex));
    }

    if (isFunction(beforeExit)) {
      return beforeExit(this.injectSlideProps).then(() => this.moveTo(prevSlideIndex));
    }

    this.moveTo(prevSlideIndex);
  };

  findNext = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};
    const length = children.length - 1; // eslint-disable-line
    for (let i = current + 1; i <= length; i++) {
      const slide = children[i];

      const { shouldShowIf = alwaysTrue } = slide.props;
      if (shouldShowIf!(formValues)) {
        return i;
      }
      // No valid candidate for next slide, so we test the next
    }

    // We moved through the `for` statement without finding a slide, so default to the last slide
    return length;
  };

  findPrev = () => {
    const { current } = this.state;
    const children = this.getChildren();
    const formValues = this.form && isFunction(this.form.getValues) ? this.form.getValues() : {};
    for (let i = current - 1; i >= 0; i--) {
      const slide = children[i];
      const { shouldShowIf = alwaysTrue } = slide.props;

      if (shouldShowIf!(formValues)) {
        return i;
      }
      // No valid candidate for next slide, so we test the next
    }

    // If we're here, it means that we need to show the first
    return 0;
  };

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

    return (
      <div className={classes(['sf--slider', className])}>
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
          ref={this.setFormRef}
          defaultValues={defaultValues}
        >
          {React.cloneElement(slide as React.ReactElement<SlideProps>, this.injectSlideProps)}
        </Form>
      </div>
    );
  }
}

export default Slider;
