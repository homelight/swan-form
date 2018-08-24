import * as React from 'react';
import * as PropTypes from 'prop-types';

import { classes, gatherErrors, gatherValues, execIfFunc, toKey, SlideContext } from '@swan-form/helpers';
import { isFunction, memoize } from 'lodash';

const emptyArray: any[] = [];
const emptyObject = {};
const alwaysTrue = () => true;

export interface InjectedProps {
  setRef?(el: any): void;
  getFormValues?(): { [key: string]: any };
  nextSlide?(): void;
  prevSlide?(): void;
  [key: string]: any;
}

export interface SlideProps extends InjectedProps {
  shouldShowIf?(formValues: { [key: string]: any }): boolean;
  className?: string;
  children?: React.ReactNode;
  autoFocus?: boolean;
  didEnter?: boolean;
  didEnterAsPrev?: boolean;
  didEnterAsNext?: boolean;
  beforeExit?(props: SlideProps): Promise<boolean>;
  beforeExitToPrev?(props: SlideProps): Promise<boolean>;
  beforeExitToNext?(props: SlideProps): Promise<boolean>;
  render?(slideProps: any): React.ReactNode;
  style?: React.CSSProperties;
  validate?(values: { [key: string]: any }): React.ReactNode[];
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
  focus(): void;
  getRef(): any;
}

class Slide extends React.PureComponent<SlideProps, SlideState> {
  constructor(props: SlideProps) {
    super(props);
    this.fields = {};
    this.getSlideInterface = memoize(this.getSlideInterface.bind(this));

    this.state = { errors: emptyArray };

    // maybe move this elsewhere?
    if (isFunction(props.setRef)) {
      props.setRef(this);
    }
  }

  static propTypes = {
    autoFocus: PropTypes.bool,
    beforeExit: PropTypes.func,
    beforeExitToNext: PropTypes.func,
    beforeExitToPrev: PropTypes.func,
    className: PropTypes.string,
    didEnter: PropTypes.bool,
    didEnterAsPrev: PropTypes.bool,
    didEntereAsNext: PropTypes.bool,
    render: PropTypes.func,
    shouldShowIf: PropTypes.func,
    style: PropTypes.object,
    validate: PropTypes.func,
  };

  static defaultProps = {
    // @ts-ignore
    validate: values => [],
    className: '',
    autoFocus: true,
    shouldShowIf: alwaysTrue,
    style: emptyObject,
  };

  static displayName = 'Slide';

  componentDidMount() {
    this.mounted = true;
    this.maybeAutoFocus();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fields: {
    [key: string]: RegisterPayload;
  };

  mounted: boolean;

  maybeAutoFocus = () => {
    const name = Object.keys(this.fields)[0];
    const field = this.fields[name];
    if (field) {
      field.focus();
    }
  };

  registerWithSlide = (payload: RegisterPayload) => {
    this.fields[payload.name] = { ...payload };
  };

  unregisterFromSlide = (name: string) => {
    const { [name]: removed, ...rest } = this.fields;
    this.fields = rest;
  };

  getSlideInterface() {
    return {
      registerWithSlide: this.registerWithSlide,
      unregisterFromSlide: this.unregisterFromSlide,
      advance: this.advance,
      retreat: this.retreat,
    };
  }

  advance = (event: React.KeyboardEvent<any>) => {
    const fields = Object.keys(this.fields);
    const field = fields.filter(name => this.fields[name].getRef() === event.target)[0];
    if (field) {
      const fieldIndex = fields.indexOf(field);
      const nextField = fields[fieldIndex + 1];
      if (nextField) {
        this.fields[nextField].focus();
      } else {
        this.props.nextSlide!();
      }
    }
  };

  retreat = (event: React.KeyboardEvent<any>) => {
    const fields = Object.keys(this.fields);
    const field = fields.filter(name => this.fields[name].getRef() === event.target)[0];
    if (field) {
      const fieldIndex = fields.indexOf(field);
      const prevField = fields[fieldIndex - 1];
      if (prevField) {
        this.fields[prevField].focus();
      } else {
        this.props.prevSlide!();
      }
    }
  };

  isSlideValid = () => {
    const fieldErrors = gatherErrors(this.fields, true);
    const slideErrors = this.validateSlide(true);
    return slideErrors.length === 0 && fieldErrors.length === 0;
  };

  validateSlide = (updateErrors: boolean = false) => {
    const initial = execIfFunc(this.props.validate, gatherValues(this.fields));
    const errors = Array.isArray(initial) ? initial : [initial];

    if (this.mounted && updateErrors) {
      this.setState({ errors: errors.length === 0 ? emptyArray : errors });
    }

    return errors;
  };

  render() {
    const { className, children, style, render = children } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes('sf--slide', errors.length && 'sf--slide-has-errors', className)} style={style}>
        <SlideContext.Provider value={this.getSlideInterface()}>
          {isFunction(render) ? render(this.props) : render}
        </SlideContext.Provider>
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
