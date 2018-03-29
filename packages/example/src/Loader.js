import React, { PureComponent } from 'react';

const loader = (function helper() {
  let pointer = 0;
  const registry = new Map();
  return {
    id: () => pointer++, // eslint-disable-line
    register: (id, Component) => registry.set(id, Component),
    get: id => registry.get(id),
  };
})();

const getResolve = x => (x && typeof x.default !== 'undefined' ? x.default : x);

export default function Loadable(importer, Loading = null) {
  return class Load extends PureComponent {
    constructor(props) {
      super(props);
      this.id = loader.id();
      this.state = { Component: loader.get(this.id) };
      this.unmounted = false;
    }

    componentDidMount() {
      if (!this.state.Component) {
        this.resolve(this.props);
      }
    }

    componentWillUnmount() {
      this.unmounted = true;
    }

    resolve() {
      return importer()
        .then(getResolve)
        .then(Component => {
          if (!this.unmounted) {
            loader.register(this.id, Component);
            this.setState({ Component });
          }
        });
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return React.isValidElement(Loading) ? Loading : null;
    }
  };
}
