# Swan Form

Swan Form is a toolbox for elegantly creating forms with React.

## Development Note

These packages are new, so there might be a few bugs to work out.

## Install

Pick and choose what packages you want to use.

## Usage

### Fields

```bash
npm install --save @swan-form/field
```

The main component to use is the `Field` component. If you want to compose fields, then do so with the `asField` HOC.

#### Turning off autoComplete

Setting the a form's autoComplete value to `off` will override all fields and have those set to `off` as well. However, you will see mixed results when trying to set 'autoComplete' to off because most modern browsers will still attmept to autocomplete the field even if the form and the field are set to 'off'.

See [this MDN note](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more information.

#### Formatters

@todo write docs

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

@todo document

## Contributing

This is a Lerna monorepo (using yarn workspaces) so that we can isolate the packages so that people can pick and choose what they want to use without installing the whole lot.

To start, you should run `yarn run bootstrap`, which will install the dependencies for all the packages in the root `node_modules` directly and link each package's dependencies as well as create links for each package.

Some convenience tooling is also made possible with `nps`, but each `nps` script has an `npm` equivalent. So, if you want to have Babel watch all the packages and start the example project, you can run `yarn run dev`.

### Code Formatting and Linting

Uses prettier and husky to ensure that files are looking good before you commit them.

Uses AirBnB's eslint config — one shared across all packages.

## TODO

### General

* [ ] Expand Readme
* [ ] Better docs
* [ ] Improve test coverage
* [ ] Ship some esmodules
* [ ] creating typings

## License

Apache © [Eave](https://github.com/helloeave)
