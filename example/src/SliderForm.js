import React, { Component } from 'react';
import { Slide, Slider } from './flow-form';

export default class SliderForm extends Component {
  render() {
    return (
      <div>
        <Slider
          slides={[
            {
              render: () => <div>Hi ma 1!</div>,
            },
            {
              render: () => <div>Hi ma 2!</div>,
            },
            {
              render: () => <div>Hi ma 3!</div>,
            },
            {
              render: () => <div>Hi ma 4!</div>,
            },
          ]}
        />
      </div>
    );
  }
}
