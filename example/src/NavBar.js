import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowing: true };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isShowing: !prevState.isShowing,
    }));
  }

  render() {
    const { pathname } = window.location;
    return (
      <div className={!this.state.isShowing ? 'NavBar--Hide' : ''}>
        <div className="NavBar">
          <ul>
            <li className={pathname === '/' ? 'NavBar--Active' : ''}>
              <Link to="/">Intro</Link>
            </li>
            <li className={pathname === '/dependent-field' ? 'NavBar--Active' : ''}>
              <Link to="/dependent-field">Dependent Field</Link>
            </li>
            <li className={pathname === '/regular' ? 'NavBar--Active' : ''}>
              <Link to="/regular">Regular Form</Link>
            </li>
            <li className={pathname === '/slider-form' ? 'NavBar--Active' : ''}>
              <Link to="/slider-form">Slider</Link>
            </li>
            <li className={pathname === '/styling' ? 'NavBar--Active' : ''}>
              <Link to="/styling">Styling</Link>
            </li>
            <li className={pathname === '/with-redux' ? 'NavBar--Active' : ''}>
              <Link to="/with-redux">With Redux</Link>
            </li>
            <li className={pathname === '/with-react-router' ? 'NavBar--Active' : ''}>
              <Link to="/with-react-router">With React Router</Link>
            </li>
            <li className={pathname === '/asfield-hoc' ? 'NavBar--Active' : ''}>
              <Link to="/asfield-hoc">asField HOC</Link>
            </li>
          </ul>
          <div className="NavBar--toggler" onClick={this.toggle}>
            {this.state.isShowing ? 'Hide' : 'Show'}
          </div>
        </div>
        <div className="NavBar--Spacer" />
      </div>
    );
  }
}
