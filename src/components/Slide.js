import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from '../helpers/autobind';
import isFunction from '../helpers/isFunction';
import classes from '../helpers/classes';

import styles from './Slide.css';

const alwaysTrue = () => true;

export default class Slide extends Component {
  static propTypes = {
    shouldShowIf: PropTypes.func,
  };

  static defaultProps = {
    shouldShowIf: alwaysTrue,
  };

  constructor(props) {
    super(props);
    this.state = {
      isValid: true, // consider finding a better way to do this
      fields: {},
    };
    this.registerField = this.registerField.bind(this);
    this.unregisterField = this.unregisterField.bind(this);
    this.setRef = this.setRef.bind(this);

    autobind(this, ['setRef', 'isValid']);
  }

  componentDidMount() {
    this.register();
  }

  // We don't want to rerender on state change
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillUnmount() {
    this.unregister();
  }

  setRef(el) {
    this.ref = el;
  }

  setValid(isValid) {
    this.setState(prevState => ({
      isValid,
    }));
  }

  register() {
    if (isFunction(this.props.register)) {
      this.props.register();
    }
  }

  unregister() {
    if (isFunction(this.props.unregister)) {
      this.props.unregister();
    }
  }

  registerField(name, validate) {
    this.setState(prevState => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [name]: validate,
      },
    }));
  }

  unregisterField(name) {
    const { [name]: removed, ...remaining } = this.state.fields;
    this.setState(prevState => ({
      ...prevState,
      fields: remaining,
    }));
  }

  isValid() {
    return true;
  }

  render() {
    const { position } = this.props;
    const classNames = classes([
      'flowform--slide',
      position === 'before' && 'flowform--slide--before',
      position === 'current' && 'flowform--slide--current',
      position === 'after' && 'flowform--slide--after',
    ]);
    console.log(classNames);
    return (
      <div className={classNames} ref={this.setRef}>
        {this.props.children}
      </div>
    );
  }
}
