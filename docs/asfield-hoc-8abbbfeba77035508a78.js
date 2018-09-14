(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{55:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(59);\n/* harmony import */ var _swan_form_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n/* eslint-disable react/no-multi-comp, react/prefer-stateless-function, react/prop-types */\n\n\n\n\n/* eslint-disable no-console */\n\nvar onSubmit = function onSubmit(values) {\n  console.log(values);\n  return Promise.resolve(values);\n};\n/* eslint-enable no-console */\n\n\nvar toWrap = function toWrap(_ref) {\n  var name = _ref.name,\n      onChange = _ref.onChange,\n      value = _ref.value,\n      placeholder = _ref.placeholder,\n      setRef = _ref.setRef;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {\n    name: name,\n    onChange: onChange,\n    ref: setRef,\n    value: value,\n    placeholder: placeholder\n  });\n};\n\nvar toWrapClass =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(toWrapClass, _Component);\n\n  function toWrapClass() {\n    return _Component.apply(this, arguments) || this;\n  }\n\n  var _proto = toWrapClass.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        isValid = _this$props.isValid,\n        setRef = _this$props.setRef,\n        getValue = _this$props.getValue,\n        setValue = _this$props.setValue,\n        spreadProps = _objectWithoutPropertiesLoose(_this$props, ["isValid", "setRef", "getValue", "setValue"]);\n\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({\n      ref: setRef\n    }, spreadProps));\n  };\n\n  return toWrapClass;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\nvar Wrapped = Object(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* asField */ "e"])(toWrap);\nvar WrappedClass = Object(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* asField */ "e"])(toWrapClass);\n\nvar asFieldHOC =\n/*#__PURE__*/\nfunction (_Component2) {\n  _inheritsLoose(asFieldHOC, _Component2);\n\n  function asFieldHOC(props) {\n    var _this;\n\n    _this = _Component2.call(this, props) || this;\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (event) {\n      var _event$target = event.target,\n          name = _event$target.name,\n          value = _event$target.value;\n\n      _this.setState(function (prevState) {\n        var _Object$assign;\n\n        return Object.assign({}, prevState, (_Object$assign = {}, _Object$assign[name] = value, _Object$assign));\n      });\n    });\n\n    _this.state = {\n      aWrappedFormInput: \'\',\n      aWrappedFormInput2: \'\'\n    };\n    return _this;\n  }\n\n  var _proto2 = asFieldHOC.prototype;\n\n  _proto2.render = function render() {\n    var _this2 = this;\n\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_form__WEBPACK_IMPORTED_MODULE_2__[/* Form */ "a"], {\n      name: "test",\n      onSubmit: onSubmit\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Stateless Input Component Wrapped with HOC:", \' \', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Wrapped, {\n      name: "aWrappedFormInput",\n      onChange: this.onChange,\n      placeholder: "test"\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "ES6 Class Based Input Component Wrapped with HOC:", \' \', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedClass, {\n      name: "aWrappedFormInput2",\n      onChange: this.onChange,\n      placeholder: "test"\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Values"), Object.keys(this.state).map(function (key) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {\n        key: key\n      }, key + ": " + _this2.state[key]);\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Submit */ "d"], null)));\n  };\n\n  return asFieldHOC;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(asFieldHOC));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/asFieldHOC.js?')}}]);