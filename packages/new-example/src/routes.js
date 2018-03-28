import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import store from './store';

import Container from './components/Container';

import Intro from './components/pages/Intro';

const Dummy = () => <div>Dummy!</div>;

export const pages = [
  ['/', 'Intro', Intro],
  ['/dependent-field', 'Dependent Field', Dummy],
  ['/dynamic-field', 'Dynamic Field', Dummy],
  ['/extra-fields', 'Extra Field', Dummy],
  ['/formatters', 'Formatters', Dummy],
  ['/regular', 'Regular Form', Dummy],
  ['/slider-form', 'Slider', Dummy],
  ['/styling', 'Styling', Dummy],
  ['/with-redux', 'With Redux', Dummy],
  ['/with-react-router', 'With React Router', Dummy],
  ['/asfield-hoc', 'asField HOC', Dummy],
];

class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.any, // eslint-disable-line
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={this.props.history}>
          <Switch>
            <Container>
              {pages.map(([path, name, component]) => (
                <Route key={name} path={path} component={component} exact />
              ))}
            </Container>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Routes);
