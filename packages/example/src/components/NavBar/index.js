/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';
import Portal from '../Portal';
import { pages } from '../../routes';
import { hide, show } from '../../redux/nav';

import styles from './NavBar.scss';

function createLink(path, name, pathname) {
  return (
    <Link key={path} to={path}>
      <li className={pathname === path ? styles.active : ''}>{name}</li>
    </Link>
  );
}

class NavBar extends Component {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
  };

  toggle = () => {
    const { isShowing, hide, show } = this.props;
    (isShowing ? hide : show)();
  };

  render() {
    const { pathname } = this.props.location;
    console.log('styles', styles.navBar, !this.props.isShowing && styles.hide);
    return (
      <Portal>
        <div className={classes(styles.navBar, !this.props.isShowing && styles.hide)}>
          <ul>{pages.map(([path, name, ...ignore]) => createLink(path, name, pathname))}</ul>
          <div className={styles.toggler} onClick={this.toggle}>
            {this.props.isShowing ? '↓ Hide ↓' : '↑ Show ↑'}
          </div>
        </div>
      </Portal>
    );
  }
}

export default withRouter(
  connect(
    state => ({ isShowing: state.nav.show }),
    { hide, show },
  )(NavBar),
);
