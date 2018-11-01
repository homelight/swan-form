# Changelog

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
