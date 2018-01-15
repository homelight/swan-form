import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RegularForm from './RegularForm';
import SliderForm from './SliderForm';

import NavBar from './NavBar';

const padding = { marginTop: '10rem' };
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="*" component={NavBar} />
          <div style={padding}>
            <Route path="/" exact component={RegularForm} />
            <Route path="/regular" exact component={RegularForm} />
            <Route path="/slider-form" component={SliderForm} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
