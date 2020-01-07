/* eslint-disable no-alert, react/prefer-stateless-function */
import React, { Component } from 'react';
import { Field } from '@swan-form/field';
import { Slide, Slider } from '@swan-form/slider';
import { hot } from 'react-hot-loader';

const isNull = value => value === null;
const isDefined = value => typeof value !== 'undefined';

/**
 * Helper validation
 */
const required = value => (isDefined(value) && !isNull(value) && value.trim() ? false : 'Required');

const onSubmit = values => {
  alert(JSON.stringify(values));
  return values;
};
const beforeSubmit = values =>
  Promise.resolve(
    Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: typeof values[key] === 'string' ? values[key].toUpperCase() : values[key] }),
      {},
    ),
  );

class SliderFormWithoutShowableSlides extends Component {
  scrollToTop = () => {
    if (this.wrapper) {
      // will probably only work fully in Firefox and Chrome
      this.wrapper.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  setRef = el => {
    this.wrapper = el;
  };

  render() {
    return (
      <div ref={this.setRef}>
        <Slider afterSlideChange={this.scrollToTop} beforeSubmit={beforeSubmit} onSubmit={onSubmit}>
          <Slide shouldShowIf={() => false}>
            <div>
              <h1>This should be skipped</h1>
              <p>No one will ever read this text.</p>
            </div>
          </Slide>
        </Slider>
      </div>
    );
  }
}

export default hot(module)(SliderFormWithoutShowableSlides);
