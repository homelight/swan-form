import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';
import autobind from '../helpers/autobind';
import clamp from '../helpers/clamp';

import './Slider.css';

function getPosition(slide, index) {
  if (slide === index) {
    return 'current';
  }
  if (slide > index) {
    return 'before';
  }
  return 'after';
}

export default class Slider extends Component {
  static propTypes = {
    height: PropTypes.string,
  };

  static defaultProps = {
    height: '500px',
  };

  static childContextTypes = {
    registerSlide: PropTypes.func,
    unregisterSlide: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.current || 0,
    };
    this.height = { height: props.height };

    autobind(this, ['registerSlide', 'unregisterSlide', 'prev', 'next']);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.height !== this.props.height) {
      this.height = { height: nextProps.height };
    }
  }

  getChildContext() {
    return {
      registerSlide: this.registerSlide,
      unregisterSlide: this.unregisterSlide,
    };
  }

  registerSlide(ref) {
    // not quite adequate....
    this.slides = [...this.slides, ref];
  }

  unregisterSlide(ref) {
    this.slides = [...this.slides.filter(slide => slide !== ref)];
  }

  moveTo(index) {
    this.setState(prevState => ({
      ...prevState,
      current: index,
    }));
  }

  prev() {
    this.change(-1);
  }

  next() {
    this.change(1);
  }

  change(val) {
    this.setState(prevState => {
      const newVal = clamp(prevState.current + val, 0, this.props.slides.length - 1);
      console.log(prevState.current, newVal);
      if (newVal === prevState.current) {
        return prevState;
      }
      return {
        ...prevState,
        current: newVal,
      };
    });
  }

  maybeFindNextSlide(index) {}

  render() {
    return (
      <div className="flowform--slider" style={this.height}>
        <div
          onClick={this.prev}
          className="flowform--slider--control flowform--slider--control--left"
        >
          L
        </div>
        <div
          onClick={this.next}
          className="flowform--slider--control flowform--slider--control--right"
        >
          R
        </div>
        {this.props.slides.map((slide, index) => (
          <Slide key={index} position={getPosition(this.state.current, index)}>
            {slide.render()}
          </Slide>
        ))}
      </div>
    );
  }
}
