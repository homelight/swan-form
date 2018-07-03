# Changelog

## 0.2.2

- [field] fix problem with detecting `selectionStart` for cursor management
- [field] fix multiple calls to `setState` on multiple selects
- [helpers] fix regression with createFormatter
- [helpers] fix possible non-integer value with `repeat`
- [field] render all buttons as button rather than as 'input' or 'button'
- [field] handle checkable fields differently
- [form] prevent default on reset
- [field] make `<Reset />` a wrapper for `Field`

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
