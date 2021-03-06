import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import store from './store';

import Loader from './Loader';

const Loading = <div>Loading...</div>;

const Intro = Loader(() => import(/* webpackChunkName: "intro" */ './components/pages/Intro'), Loading);

const Container = Loader(() => import(/* webpackChunkName: "container" */ './components/Container'), Loading);

const SliderForm = Loader(() => import(/* webpackChunkName: "sliderForm" */ './components/pages/SliderForm'), Loading);

const SliderFormWithSkips = Loader(
  () => import(/* webpackChunkName: "sliderFormWithSkips" */ './components/pages/SliderFormWithSkips'),
  Loading,
);

const SliderFormWithoutShowableSlides = Loader(
  () =>
    import(
      /* webpackChunkName: "sliderFormWithoutShowableSlides" */ './components/pages/SliderFormWithoutShowableSlides'
    ),
  Loading,
);

const SliderFormWithSkipsInHooks = Loader(
  () => import(/* webpackChunkName: "sliderFormWithSkipsInHooks" */ './components/pages/SliderFormWithSkipsInHooks'),
  Loading,
);

const Formatters = Loader(
  () => import(/* webpackChunkName: "formatters-example" */ './components/pages/Formatters'),
  Loading,
);

const Nested = Loader(() => import(/* webpackChunkName: "nested-example" */ './components/pages/Nested'), Loading);

const DependentField = Loader(
  () => import(/* webpackChunkName: "dependent-field" */ './components/pages/DependentField'),
  Loading,
);

const DynamicField = Loader(
  () => import(/* webpackChunkName: "dynamic-field" */ './components/pages/DynamicField'),
  Loading,
);

const ExtraFields = Loader(
  () => import(/* webpackChunkName: "extra-field" */ './components/pages/ExtraFields'),
  Loading,
);

const RegularForm = Loader(
  () => import(/* webpackChunkName: "regular-form" */ './components/pages/RegularForm'),
  Loading,
);
const Styling = Loader(() => import(/* webpackChunkName: "styling" */ './components/pages/Styling'), Loading);

const AsFieldHoc = Loader(() => import(/* webpackChunkName: "asfield-hoc" */ './components/pages/asFieldHOC'), Loading);

const Theme = Loader(() => import(/* webpackChunkName: "theme" */ './components/pages/Theme'), Loading);

const DownshiftExample = Loader(
  () => import(/* webpackChunkName: "downshift-example" */ './components/pages/Downshift'),
  Loading,
);

const FormValidation = Loader(
  () => import(/* webpackChunkName: "form-validation" */ './components/pages/FormValidation'),
  Loading,
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
  ['/slider-form-with-skips', 'SliderWithSkips', SliderFormWithSkips],
  ['/slider-form-without-showable-slides', 'SliderWithoutShowableSlides', SliderFormWithoutShowableSlides],
  ['/slider-form-with-skips-in-hooks', 'SliderFormWithSkipsInHooks', SliderFormWithSkipsInHooks],
  ['/styling', 'Styling', Styling],
  ['/nested', 'Nested', Nested],
  ['/with-redux', 'With Redux', Dummy],
  ['/with-react-router', 'With React Router', Dummy],
  ['/asfield-hoc', 'asField HOC', AsFieldHoc],
  ['/theme', 'Theming', Theme],
  ['/downshift-example', 'Downshift Example', DownshiftExample],
  ['/form-validation', 'Form Validation', FormValidation],
];

export const baseName = process.env.NODE_ENV === 'production' ? '/swan-form' : '/';
export const dedupeSlashes = str => str.replace(/[/]{2,}/g, '/');

class Routes extends PureComponent {
  static propTypes = {
    history: PropTypes.any, // eslint-disable-line
  };

  componentDidMount() {
    if (window.location.search) {
      const [, page] = window.location.search.split('=');
      this.props.history.push(dedupeSlashes(`${page}`));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={this.props.history} basename={process.env.NODE_ENV === 'production' ? '/swan-form' : '/'}>
          <Switch>
            <Container>
              {pages.map(([path, name, component]) => (
                <Route key={name} path={dedupeSlashes(`${baseName}/${path}`)} component={component} exact />
              ))}
            </Container>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Routes);
