import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <ul>
          <li>
            <Link to="regular">Regular Form</Link>
          </li>
          <li>
            <Link to="slider-form">Slider</Link>
          </li>
          <li>Styling</li>
          <li>With Redux</li>
          <li>With React Router</li>
        </ul>
      </div>
    );
  }
}
