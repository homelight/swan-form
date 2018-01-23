import React, { Component } from 'react';
import FormattedPhone from './FormattedPhone';

export default class Formatters extends Component {
  render() {
    return (
      <div>
        US Formatted Phone: <FormattedPhone />
      </div>
    );
  }
}
