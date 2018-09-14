import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Loader from '../Loader';
import styles from './Container.scss';

const NavBar = Loader(() => import(/* webpackChunkName: "nav-bar" */ './NavBar'), null);

class Container extends PureComponent {
  render() {
    return (
      <div>
        <NavBar />
        <div className={[styles.container, this.props.navVisible && styles.navVisible].filter(O => O).join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ navVisible: state.nav.show }))(Container);
