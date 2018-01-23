/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function createLink(path, name, pathname) {
  return (
    <li key={path} className={pathname === path ? 'NavBar--Active' : ''}>
      <Link to={path}>{name}</Link>
    </li>
  );
}

const pages = [
  ['/', 'Intro'],
  ['/dependent-field', 'Dependent Field'],
  ['/extra-fields', 'Extra Field'],
  ['/formatters', 'Formatters'],
  ['/regular', 'Regular Form'],
  ['/slider-form', 'Slider'],
  ['/styling', 'Styling'],
  ['/with-redux', 'With Redux'],
  ['/with-react-router', 'With React Router'],
  ['/asfield-hoc', 'asField HOC'],
];

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
          <ul>{pages.map(([path, name]) => createLink(path, name, pathname))}</ul>
          <div className="NavBar--toggler" onClick={this.toggle}>
            {this.state.isShowing ? 'Hide' : 'Show'}
          </div>
        </div>
        <div className="NavBar--Spacer" />
      </div>
    );
  }
}
