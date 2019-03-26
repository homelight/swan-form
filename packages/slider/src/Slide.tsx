/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  classes,
  gatherErrors,
  gatherValues,
  execIfFunc,
  toKey,
  SlideContext,
  alwaysFilteredArray,
  isFunction,
  memoize,
} from '@swan-form/helpers';

const emptyArray: any[] = [];
const emptyObject = {};
const alwaysTrue = () => true;

export interface InjectedProps {
  /**
   * Sets a ref on the slide itself
   */
  setRef?(el: any): void;
  /**
   * Gets all registered form values
   */
  getFormValues?(): { [key: string]: any };
  /**
   * Moves to the next eligible slide
   */
  nextSlide?(): void;
  /**
   * Moves to the previous eligible slide
   */
  prevSlide?(): void;
  /**
   * Other props can be injected into each slide
   */
  [key: string]: any;
}

export interface SlideProps extends InjectedProps {
  shouldShowIf?(formValues: { [key: string]: any }): boolean;
  className?: string;
  children?: React.ReactNode;
  autoFocus?: boolean;
  didEnter?(props: SlideProps): void;
  didEnterAsPrev?(props: SlideProps): void;
  didEnterAsNext?(props: SlideProps): void;
  beforeExit?(props: SlideProps): Promise<any>;
  beforeExitToPrev?(props: SlideProps): Promise<any>;
  beforeExitToNext?(props: SlideProps): Promise<any>;
  render?(slideProps: any): React.ReactNode;
  style?: React.CSSProperties;
  /**
   * Validates all the fields on the slide
   */
  validate?(values: { [key: string]: any }): boolean | React.ReactNode | React.ReactNode[];
}

export interface SlideState {
  errors: React.ReactNode[];
}

export interface RegisterPayload {
  name: string;
  validate(value: any, updateErrors: boolean): React.ReactNode[];
  getValue(): any;
  reset(): void;
  setValue(value: any): void;
  /**
   * Focuses the first focusable element
   */
  focus(): void;
  getRef(): any;
}

class Slide extends React.PureComponent<SlideProps, SlideState> {
  constructor(props: SlideProps) {
    super(props);
    // maybe move this elsewhere?
    execIfFunc(props.setRef, this);
  }

  state = { errors: emptyArray };

  static propTypes = {
    autoFocus: PropTypes.bool,
    beforeExit: PropTypes.func,
    beforeExitToNext: PropTypes.func,
    beforeExitToPrev: PropTypes.func,
    className: PropTypes.string,
    didEnter: PropTypes.func,
    didEnterAsPrev: PropTypes.func,
    didEnterAsNext: PropTypes.func,
    render: PropTypes.func,
    shouldShowIf: PropTypes.func,
    style: PropTypes.shape({}),
    validate: PropTypes.func,
  };

  static defaultProps = {
    validate: (_: { [key: string]: any }) => [] as React.ReactNode[],
    className: '',
    autoFocus: true,
    shouldShowIf: alwaysTrue,
    style: emptyObject,
    beforeExitToNext: undefined,
    beforeExitToPrev: undefined,
    beforeExit: undefined,
    didEnter: undefined,
    didEnterAsNext: undefined,
    didEnterAsPrev: undefined,
    render: undefined,
  };

  static displayName = 'Slide';

  componentDidMount() {
    this.mounted = true;
    this.maybeAutoFocus();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fields: { [key: string]: RegisterPayload } = {};

  mounted: boolean;

  /**
   * Called to autofocus on the first field in a slide if one exists
   */
  maybeAutoFocus = () => {
    const { autoFocus } = this.props;

    const [name] = Object.keys(this.fields);
    const field = this.fields[name];

    if (autoFocus && field && isFunction(field.focus)) {
      field.focus();
    }
  };

  /**
   * Passed to fields to register with the slide
   */
  registerWithSlide = (payload: RegisterPayload) => {
    this.fields[payload.name] = { ...payload };
  };

  /**
   * Passed to fields to unregister from the slide
   */
  unregisterFromSlide = (name: string) => {
    const { [name]: removed, ...rest } = this.fields;
    this.fields = rest;
  };

  /**
   * This gets passed down in context.
   */
  getSlideInterface = memoize(() => ({
    registerWithSlide: this.registerWithSlide,
    unregisterFromSlide: this.unregisterFromSlide,
    advance: this.advance,
    retreat: this.retreat,
  }));

  /**
   * Advances to the next field or slide
   */
  advance = (event: React.KeyboardEvent<any>) => {
    const { nextSlide } = this.props;
    const fields = Object.keys(this.fields);
    const [field] = fields.filter(name => this.fields[name].getRef() === event.target);
    if (field) {
      const fieldIndex = fields.indexOf(field);
      const nextField = fields[fieldIndex + 1];
      if (nextField) {
        this.fields[nextField].focus();
      } else {
        execIfFunc(nextSlide);
      }
    }
  };

  /**
   * Retreats to the previous field or slide
   */
  retreat = (event: React.KeyboardEvent<any>) => {
    const fields = Object.keys(this.fields);
    const [field] = fields.filter(name => this.fields[name].getRef() === event.target);

    if (field) {
      const fieldIndex = fields.indexOf(field);
      const prevField = fields[fieldIndex - 1];
      execIfFunc(prevField ? this.fields[prevField].focus : this.props.prevSlide);
    }
  };

  /**
   * Checks if a slide is valid
   */
  isSlideValid = async () => {
    const fieldErrors = gatherErrors(this.fields, true);
    const slideErrors = await this.validateSlide(true);
    return slideErrors.length === 0 && fieldErrors.length === 0;
  };

  /**
   * Validates a slide and conditionally updates the errors for the slide
   */
  validateSlide = async (updateErrors: boolean = false) => {
    const initial = await execIfFunc<React.ReactNode | React.ReactNode[]>(
      this.props.validate,
      gatherValues(this.fields),
    );

    const errors = alwaysFilteredArray<React.ReactNode>(initial);

    if (this.mounted && updateErrors) {
      this.setState({ errors: errors.length ? errors : emptyArray });
    }

    return errors;
  };

  render() {
    const { className, children, style, render = children } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes('sf--slide', errors.length && 'sf--slide-has-errors', className)} style={style}>
        <SlideContext.Provider value={this.getSlideInterface()}>{execIfFunc(render, this.props)}</SlideContext.Provider>
        <div className="sf--slide-errors">
          {errors.map(error => (
            <div className="sf--slide-error" key={toKey(error)}>
              {error}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export { Slide, SlideContext };
export default Slide;
