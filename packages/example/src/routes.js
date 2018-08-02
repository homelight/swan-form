import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import store from './store';

// import Container from './components/Container';
import Loader from './Loader';

const Intro = Loader(() => import(/* webpackChunkName: "intro" */ './components/pages/Intro'), <div>Loading...</div>);
const Container = Loader(
  () => import(/* webpackChunkName: "container" */ './components/Container'),
  <div>Loading...</div>,
);

const SliderForm = Loader(
  () => import(/* webpackChunkName: "sliderForm" */ './components/pages/SliderForm'),
  <div>Loading...</div>,
);

const Formatters = Loader(
  () => import(/* webpackChunkName: "formatters-example" */ './components/pages/Formatters'),
  <div>Loading...</div>,
);

const DependentField = Loader(
  () => import(/* webpackChunkName: "dependent-field" */ './components/pages/DependentField'),
  <div>Loading...</div>,
);

const DynamicField = Loader(
  () => import(/* webpackChunkName: "dynamic-field" */ './components/pages/DynamicField'),
  <div>Loading...</div>,
);
const ExtraFields = Loader(
  () => import(/* webpackChunkName: "extra-field" */ './components/pages/ExtraFields'),
  <div>Loading...</div>,
);
const RegularForm = Loader(
  () => import(/* webpackChunkName: "regular-form" */ './components/pages/RegularForm'),
  <div>Loading...</div>,
);
const Styling = Loader(
  () => import(/* webpackChunkName: "styling" */ './components/pages/Styling'),
  <div>Loading...</div>,
);
const AsFieldHoc = Loader(
  () => import(/* webpackChunkName: "asfield-hoc" */ './components/pages/asFieldHOC'),
  <div>Loading...</div>,
);

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
