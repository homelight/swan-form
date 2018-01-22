# Flow Form

Flow Form is a toolbox for creating forms with React.

WIP (do not use yet)

## Install

```bash
npm install --save flow-form
```

## Usage

### Fields

The main field to use is the `Field` component.

#### Turning off autoComplete

Setting the a form's autoComplete value to `off` will override all fields and have those set to `off` as well. However, you will see mixed results when trying to set 'autoComplete' to off because most modern browsers will still attmept to autocomplete the field even if the form and the field are set to 'off'.

Currently, for Chrome, if the value of a field's autoComplete is set to off, we instead change it to 'nope', which will keep Chrome from guessing, but it will still remember past values of the same form.

See [this MDN note](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more information.

#### Formatters

Not implemented yet.

### Forms

You must pass an `onSubmit` handler to the form. This should be a function that will just run.

### Usage with Redux

If you want to store your values in Redux or some other kind of state management, then you can pass an onChange function.

### Sliders

Sliders are forms.

```
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

In the main directly, type `yarn link` to link `flow-form`. Then, link the module into the example directory:

```shell
cd example
yarn link flow-form
```

Install the depdencies for each:

```shell
yarn
cd example && yarn
```

If you want to use both while developing, open two terminals and do `yarn start` in the main directory to start rollup bundling the module and then, in the other one, cd into the `example` directory and `yarn start` to fire up the example application.

## TODO

### General

* [ ] Make readme readable
* [ ] Fix dependencies/peer dependencies for wider coverage
* [ ] Expand more test coverage
* [ ] Add in thorough documentation
* [ ] Ship CSS separately
* [ ] Split everything into separate bundles lodash style.
* [ ] Profile components to find penalty for context and overwriting context
* [ ] Publish to npm
* [ ] convert to typescript or create typings (https://github.com/KnisterPeter/react-to-typescript-definitions)

### Generic Field

* [ ] Formatters in fields
* [ ] Share more code between asField and Field
* [x] Make all field types avaiable
* [ ] Don't bind so many functions
* [x] Handle radio buttons appropriately

### Generic Form

* [ ] Sort out lifecycle methods on submit

### Slider

* [ ] Get a better slider API
* [ ] Make slider more responsive
* [ ] Allow for enter to let the slider advance to next field

### Examples

* [ ] Create withRedux example
* [ ] Create withRouter example

## License

MIT © [Eave](https://github.com/helloeave)
