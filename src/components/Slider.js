import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';

import styles from './Slider.css';

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current || 0,
    }
  }

  moveTo(index) {
    this.setState(prevState => {
      ...prevState,
      current: index,
    });
  }

  maybeFindNextSlide(index) {

  }

  render() {
    return (
      <div>
        { this.props.slides.map(slideProps => (
          <Slide {...slideProps} />
        ))}
      </div>
    )
  }
}
