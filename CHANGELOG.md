# Changelog

## main

- [all] Added `Publishing` section to the readme.

## 0.5.1

- [all] Added collaborators to all packages
- [all] Added shawn as the author to all packages

## 0.5.0

- [helpers] add `getCursor` and `hasSelectionStart`
- [field] by passing a `value` prop, you can now control a field
- [all] upgrade devDeps
- [all] convert to react-testing-library instead of enzyeme

## 0.4.3

- [field] fix attempt to unregister when not registered
- [slider] fix attempt to unregister when not registered
- [slider] call didEnterAsNext and didEnter onMount for first slide

## 0.4.1

- [slider] fix regression with losing track of form
- [slider] add `totalSlides` and `currentSlideIndex` to injected slide props
- [field] fix regression with `<Radios>` component in remounting slide
- [field] fix file fields

## 0.4.0

- [helpers] use generics when typing `filterKeysFromObj`
- [slider] delete exported css
- [slider] better document props
- [slider] re-export slide context
- [field] re-export field context
- [form] re-export form context

## 0.4.0--alpha.0

- [helpers] add some lodash-esque functions
- [helpers] fix types after upgrading typescript
- [form] reset `isSubmitting` when encountering formErrors
- [all] remove lodash to decrease bundle size
- [all] upgrade all dev deps
- [all] export all interfaces and types

## 0.3.14

- [form] fix defaultProp key
- [field] optionally call a passed in `setRef` function in `asField`

## 0.3.13

- [form] fix form validations not firing
- [all] rebuild documentation

## 0.3.12

- [form] stop spreading `validate` into the form dom node

## 0.3.11

- [field] fix validations so that we always call `unformat` on the value before validating

## 0.3.10

- [slider] add `setRef` prop to forward ref to Slider's div container

## 0.3.9

- [slider] add `afterSlideChange` hook on the slide component

## 0.3.8

- [slider] allow for slide validations to be promises

## 0.3.7

- [slider] relax promise types on slide hooks

## 0.3.6

- [slider] clip unnecessary props from HOCs
- [slider] loosen validate type's return value to be `React.ReactNode | React.ReactNode[]`
- [field] duck type events to make it easier to work with things like Downshift
- [field] don't always put in autocomplete prop on field
- [helpers] swap order of args in `filterKeysFromObj`

## 0.3.5

- [all] upgrade deps
- [slider] extend `React.HTMLAttributes<HTMLDivElement>` in types and spread all other props into the slider

## 0.3.4

- [helpers] expand default `required` validation to include booleans
- [slider] change `didEnter`, `didEnterAsPrev`, and `didEnterAsNext` prop types from booleans to functions
- [slider] fix typo in propType `didEntereAsNext`

## 0.3.3

- [field] fixed bug where `validateOnChange` was not working on checkboxes or radio buttons
- [slider] actually use `autoFocus` props
- [helpers] export `withFormErrors`

## 0.3.2

- [all] update dependencies
- [all] update lodash imports to allow rollup to treeshake better
- [slider] _breaking_ change `next` behavior so that it calls the submit instead of going to the last slide when no viable candidates are found
- [field] allow for `asField` to set a default value for a field type
- [field] update file structures to appease the linter
- [helpers] slim down classes code

## 0.3.1

- [slider] Filter out falsey errors from slide validations
- [field] fix regression sending focus and click handlers
- [field] stop filtering out isFormSubmitting and hasFormSubmitted
- [helpers] ship combined hoc to make asField nicer

## 0.3.0

Rewriting for the new context API made a lot of breaking changes, so more things were cleaned up at the same time.
Approaching a v1.0.0.

- [all] Rewrite with new context api
- [all] upgrade dependencies
- [helpers] add `withForm`, `withSlide`, and `withAsField` HOCs to make it easy to consume contexts
- [helpers] remove deprecated functions
- [slider] _breaking_ add advance / retreat functionality
- [slider] _breaking_ stop spreading `commonProps` and instead nest them under the `common`
- [slider] add slide level validations
- [form] _breaking_ automatically restore values of re-mounting fields
- [extra-fields] convert to typescript
- [field] _breaking_ rename `asyncValidate` to `validateOnBlur`
- [field] _breaking_ rename `validateWhileTyping` to `validateOnChange`
- [field] _breaking_ remove auto keyhandling for enter / tab
- [field] _breaking_ change asField wrapper so it doesn't take options
- [field] _breaking_ `register` prop (boolean) now determines if a field registers with form / slide
- [field] _breaking_ change all event handlers to pass through the event instead of the event.target to callback
- [field] _breaking_ change onChange callback to pass event rather than `(value, name)`
- [field] _breaking_ default value for multiple select to `[]` from `['']`

### 0.2.17

- [field] Revert unintentional changes

### 0.2.16

- [field] change the html structure to allow better sibling selectors for the input
- [field] use the Field component in the Radios component.
- [exmaple] add material theme example
- [field] fix icon propType on Field (element -> node)

### 0.2.15

- [field] format initial value if formatter is supplied

### 0.2.14

- [field] fix minor bug when setting initial value

### 0.2.13

- [form] change prop `values` to `defaultValues`
- [slider] accept `defaultValues` prop and pass through to `Form`

### 0.2.12

- [all] downgrade typescript for better compatibility, export more types

### 0.2.11

- [all] upgrade dependencies
- [all] turn on stricter typechecking with typescript
- [field] allow for prop `defaultValue` in `asField` wrapper

### 0.2.10

- [all] include src in package to see if that will fix some typescript issues

### 0.2.9

- [all] change build system

### 0.2.4 - 0.2.8

- [all] republish (failure because lerna publishing with 2fa is not supported well)

### 0.2.3

- [slider] call render prop in slide rather than slider so slide lifecycle method does not get skipped

### 0.2.2

- [field] fix problem with detecting `selectionStart` for cursor management
- [field] fix multiple calls to `setState` on multiple selects
- [helpers] fix regression with createFormatter
- [helpers] fix possible non-integer value with `repeat`
- [field] render all buttons as button rather than as 'input' or 'button'
- [field] handle checkable fields differently
- [form] prevent default on reset
- [field] make `<Reset />` a wrapper for `Field`
- [field] add `sf--required` class to required fields
- [field] add `id`s to radio buttons within radio fieldsets. Add `htmlFor` as well.
- [helpers] export `required` fn and the `createRequired` fn
- [field] change type on validate prop

### 0.2.1

- [all] fix problems with the exports
- [all] fix typings

## 0.2.0

- [field] fix TypeError on Safari when accessing `selectionStart` on non-text fields
- [all] upgrade babel packages
- [all] move devDependencies to root package.json
- [all] upgrade eslint
- [all] fix lint errors
- [all] use rollup to build cjs instead of just babel
- [all] create es modules
- [all] convert to typescript and create typings

## 0.1.0

Initial Release for:

- @swan-form/field
- @swan-form/form
- @swan-form/slider
- @swan-form/helpers
