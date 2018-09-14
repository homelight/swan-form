import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { classes } from '@swan-form/helpers';

import Loader from '../Loader';
import styles from './Container.scss';

const NavBar = Loader(() => import(/* webpackChunkName: "nav-bar" */ './NavBar'), null);

class Container extends PureComponent {
  static propTypes = {
    navVisible: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  };

  render() {
    const { navVisible, children } = this.props;
    return (
      <div>
        <NavBar />
        <div className={classes(styles.container, navVisible && styles.navVisible)}>{children}</div>
      </div>
    );
  }
}

export default connect(state => ({ navVisible: state.nav.show }))(Container);
