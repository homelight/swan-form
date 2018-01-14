import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const spreadProps = ['name', 'value', 'placeholder'];

export default class DateField extends Component {
  constructor(props) {
    super(props);
  }

  getSpreadProps() {
    return spreadProps.reduce((props, prop) => {
      if (this.props[prop]) {
        props[prop] = this.props[prop];
      }
      return props;
    }, {});
  }

  render() {
    return <Field type="text" {...this.getSpreadProps()} />;
  }
}
