/* eslint-disable no-alert, react/prefer-stateless-function */
import React, { Component } from 'react';
import { Slide, Slider } from '@swan-form/slider';
import { hot } from 'react-hot-loader';

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

class SliderFormWithSkipsInHooks extends Component {
  constructor(props) {
    super(props);

    this.state = { skip: undefined };
  }

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
    const { skip } = this.state;

    return (
      <div ref={this.setRef}>
        <Slider afterSlideChange={this.scrollToTop} beforeSubmit={beforeSubmit} onSubmit={onSubmit}>
          <Slide
            beforeExit={() => {
              const self = this;
              return new Promise(res =>
                setTimeout(() => {
                  res(self.setState({ skip: true }));
                }, 2000),
              );
            }}
          >
            <div>
              <h1>First slide sets skip on the component</h1>
              <p>I hope this works.</p>
            </div>
          </Slide>
          <Slide shouldShowIf={() => !skip}>
            <div>
              <h1>You should not see this slide</h1>
              <p>Because beforeExit sets skip to true.</p>
            </div>
          </Slide>
          <Slide shouldShowIf={() => skip}>
            <div>
              <h1>This slide should not be skipped</h1>
              <p>Because beforeExit sets skip to true.</p>
            </div>
          </Slide>
          <Slide>
            <div>
              <h2>Well that&apos;s it I guess.</h2>
            </div>
          </Slide>
        </Slider>
      </div>
    );
  }
}

export default hot(module)(SliderFormWithSkipsInHooks);
