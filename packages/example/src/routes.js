import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import store from './store';

// import Container from './components/Container';
import Loader from './Loader';

const Intro = Loader(() => import(/* webpackChunkName: "intro" */ './components/pages/Intro'), <div>Loading...</div>);
const Container = Loader(() => import(/* webpackChunkName: "container" */ './components/Container'));

const SliderForm = Loader(() => import(/* webpackChunkName: "sliderForm" */ './components/pages/SliderForm'));

const Formatters = Loader(() => import(/* webpackChunkName: "formatters-example" */ './components/pages/Formatters'));

const DependentField = Loader(() => import('./components/pages/DependentField'));

const DynamicField = Loader(() => import('./components/pages/DynamicField'));
const ExtraFields = Loader(() => import('./components/pages/ExtraFields'));
const RegularForm = Loader(() => import('./components/pages/RegularForm'));
const Styling = Loader(() => import('./components/pages/Styling'));
const AsFieldHoc = Loader(() => import('./components/pages/asFieldHOC'));

const Dummy = () => <div>@TODO</div>;

export const pages = [
  ['/', 'Intro', Intro],
  ['/dependent-field', 'Dependent Field', DependentField],
  ['/dynamic-field', 'Dynamic Field', DynamicField],
  ['/extra-fields', 'Extra Field', ExtraFields],
  ['/formatters', 'Formatters', Formatters],
  ['/regular', 'Regular Form', RegularForm],
  ['/slider-form', 'Slider', SliderForm],
  ['/styling', 'Styling', Styling],
  ['/with-redux', 'With Redux', Dummy],
  ['/with-react-router', 'With React Router', Dummy],
  ['/asfield-hoc', 'asField HOC', AsFieldHoc],
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
              {pages.map(([path, name, component]) => <Route key={name} path={path} component={component} exact />)}
            </Container>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Routes);
