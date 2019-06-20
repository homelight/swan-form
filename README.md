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

The main component to use is the `Field` component. If you want to compose fields or create new ones, then do so with the `asField` HOC.

#### Turning off autoComplete

Setting the a form's autoComplete value to `off` will override all fields and have those set to `off` as well. However, you will see mixed results when trying to set 'autoComplete' to off because most modern browsers will still attmept to autocomplete the field even if the form and the field are set to 'off'.

See [this MDN note](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for more information.

#### Formatters

Formatters format the value of text fields as you type them. For instance, if you want to make a quick formatter to properly format Social Security Numbers, you can do the following:

```javscript
import { createFormatter } from '@swan-form/helpers';

const numbersOnly = value => value.replace(/[^0-9]{1,}/gi, '');
const SSNFormatter = createFormatter(numbersOnly, '___-__-____');
```

To use it, you would then do the following:

```jsx
<Field name="ssn" type="text" format={SSNFormatter} />
```

You can use formatters without the `createFormatter` function. The function signature for formatters is:

```javascript
const formatter = (value, cursor = null) => [formattedValue, newCursorPosition];
```

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

### Publishing

Publishing will be done by verified publishers. If you are one or have become one please follow these steps to start publishing swan-from.

1. Sign up for NPM.
2. Get added as a collaborator for `@swan-form`
3. Put out a PR with your change and get it merged into master.
4. `yarn build`
5. `npm login`
6. `yarn login`
7. `npx lerna publish`

## TODO

### General

- [ ] Expand Readme
- [ ] Better docs
- [ ] Improve test coverage

## License

Apache © [Eave](https://github.com/helloeave)
