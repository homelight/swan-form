import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

@hot(module)
export default class DependentField extends Component {
  render() {
    return (
      <div>
        <h1>Swan Form</h1>
        <p>This is the introduction to Swan Form. Yay!</p>
      </div>
    );
  }
}
