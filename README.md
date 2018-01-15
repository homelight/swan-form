# Flow Form

> TODO: Component Description

## Install

```bash
npm install --save flow-form
```

## Usage

### Fields

The main field to use is the `Field` component.

#### Formatters

Not implemented yet.

### Forms

You must pass an `onSubmit` handler to the form. This should be a function that will just run.

### Usage with Redux

If you want to store your values in Redux or some other kind of state management, then you can pass an onChange function.

### Sliders

Sliders are forms.

```jsx
import React, { Component } from 'react';

import MyComponent from 'flow-form';

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

## Contributing

Use yarn.

Uses prettier and husky to ensure that files are looking good before you commit them. No linters installed yet.

In the main repo, do `yarn install`. Then, `cd example && yarn install`. The `example` directory is a create-react-app with the `dist` directory of flow-form symlinked into `src`.

If you want to use both while developing, open two terminals and do `yarn start` in the main directory to start rollup bundling the module and then, in the other one, cd into the `example` directory and `yarn start` to fire up the example application.

## TODO

Split everything into separate bundles lodash style.

## License

MIT © [Shawn Patrick Rice](https://github.com/shawnrice)
