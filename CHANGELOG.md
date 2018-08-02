# Changelog

## 0.2.12

- [all] downgrade typescript for better compatibility, export more types

## 0.2.11

- [all] upgrade dependencies
- [all] turn on stricter typechecking with typescript
- [field] allow for prop `defaultValue` in `asField` wrapper

## 0.2.10

- [all] include src in package to see if that will fix some typescript issues

## 0.2.9

- [all] change build system

## 0.2.4 - 0.2.8

- [all] republish (failure because lerna publishing with 2fa is not supported well)

## 0.2.3

- [slider] call render prop in slide rather than slider so slide lifecycle method does not get skipped

## 0.2.2

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

## 0.2.1

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
