# Swan Form

Swan Form is a toolbox for creating forms with React.

## Development Note

These packages are unstable, and it's not recommended that you use them yet.

## Install

Pick and choose what packages you want to use.

## Usage

### Fields

```bash
npm install --save @swan-form/field
```

The main field to use is the `Field` component.

#### Turning off autoComplete

Setting the a form's autoComplete value to `off` will override all fields and have those set to `off` as well. However, you will see mixed results when trying to set 'autoComplete' to off because most modern browsers will still attmept to autocomplete the field even if the form and the field are set to 'off'.

Currently, for Chrome, if the value of a field's autoComplete is set to off, we instead change it to 'nope', which will keep Chrome from guessing, but it will still remember past values of the same form.

See [this MDN note](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more information.

#### Formatters

Not implemented yet.

### Forms

```bash
npm install --save @swan-form/form
```

You must pass an `onSubmit` handler to the form. This should be a function that will just run.

### Usage with Redux

If you want to store your values in Redux or some other kind of state management, then you can pass an onChange function.

### Sliders

```bash
npm install --save @swan-form/slider
```

Sliders are forms.

```
import React, { Component } from 'react';

import MyComponent from 'swan-form';

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

## Contributing

This is a Lerna monorepo (using yarn workspaces) so that we can isolate the packages so that people can pick and choose what they want to use without installing the whole lot.

To start, you should run `yarn run bootstrap`, which will install the dependencies for all the packages in the root `node_modules` directly and link each package's dependencies as well as create links for each package.

Some convenience tooling is also made possible with `nps`, but each `nps` script has an `npm` equivalent. So, if you want to have Babel watch all the packages and start the example project, you can run `yarn run dev`.

### Code Formatting and Linting

Uses prettier and husky to ensure that files are looking good before you commit them.

Uses AirBnB's eslint config — one shared across all packages.

## TODO

### General

* [ ] Make readme readable
* [ ] Fix dependencies/peer dependencies for wider coverage
* [ ] Expand more test coverage
* [ ] Add in thorough documentation
* [ ] Ship CSS separately
* [x] ~Split everything into separate bundles lodash style~.
* [x] Use a monorepo
* [ ] Profile components to find penalty for context and overwriting context
* [ ] Publish to npm
* [ ] Publish to github
* [ ] possibly build with webpack or go back to rollup
* [ ] convert to typescript or create typings (https://github.com/KnisterPeter/react-to-typescript-definitions)

### Generic Field

* [x] Formatters in fields
* [x] Share more code between asField and Field
* [x] Make all field types avaiable
* [ ] Don't bind so many functions
* [x] Handle radio buttons appropriately
* [ ] Put in an escape hatch not to handle state (this is possibly good for complex fields made up of multiple Field components that also use `asField`)

### Generic Form

* [ ] Sort out lifecycle methods on submit
* [ ] Fix problems with reset in AddressField (as proof of concept)

### Slider

* [ ] Get a better slider API
* [ ] consider React.cloneChildren for slides
* [ ] Make slider more responsive
* [ ] Allow for `enter` to let the slider advance to next field
* [ ] Allow passing components for next/prev
* [ ] implment afterSlide and beforeSlide hooks

### Examples

* [ ] Create withRedux example
* [ ] Create withRouter example

## License

MIT © [Eave](https://github.com/helloeave)
