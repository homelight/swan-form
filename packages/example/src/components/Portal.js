import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default class Portal extends Component {
  static propTypes = {
    // eslint-disable-next-line
    hostId: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  };

  static getHostNode(props) {
    if (props.hostId) {
      const [hostNode] = document.querySelectorAll(props.hostId);
      if (hostNode) {
        return hostNode;
      }
    }
    return document.body;
  }

  constructor(props) {
    super(props);

    this.hostNode = Portal.getHostNode(props);
    this.container = document.createElement('div');
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
