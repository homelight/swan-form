import React, { Component } from 'react';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  constructor(props) {
    super(props);

    this.hostNode = Portal.getHostNode(props);
    this.container = document.createElement('div');
  }

  static getHostNode(props) {
    let hostNode;

    if (props.hostId) {
      hostNode = document.querySelectorAll(props.hostId)[0];
      if (hostNode) {
        return hostNode;
      }
    }
    return document.body;
  }

  componentDidMount() {
    this.hostNode.appendChild(this.container);
  }

  componentWillUnmount() {
    this.hostNode.removeChild(this.container);
    this.container = null;
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.container);
  }
}
