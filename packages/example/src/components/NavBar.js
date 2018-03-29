/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pages } from '../routes';
import { hide, show } from '../redux/nav';

const styles = require('./NavBar.scss');

function createLink(path, name, pathname) {
  return (
    <Link key={path} to={path}>
      <li className={pathname === path ? styles.active : ''}>{name}</li>
    </Link>
  );
}

@connect(state => ({ isShowing: state.nav.show }), { hide, show })
export default class NavBar extends Component {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
  };

  toggle = () => {
    (this.props.isShowing ? this.props.hide : this.props.show)();
  };

  render() {
    const { pathname } = window.location;
    return (
      <div
        className={[styles.navBar, !this.props.isShowing && styles.hide].filter(O => O).join(' ')}
      >
        <ul>{pages.map(([path, name, ...ignore]) => createLink(path, name, pathname))}</ul>
        <div className={styles.toggler} onClick={this.toggle}>
          {this.props.isShowing ? '↓ Hide ↓' : '↑ Show ↑'}
        </div>
      </div>
    );
  }
}
