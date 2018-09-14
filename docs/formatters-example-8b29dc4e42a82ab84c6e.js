(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{280:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);\n/* harmony import */ var libphonenumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(387);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);\n/* harmony import */ var react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(103);\n/* harmony import */ var react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(116);\n/* harmony import */ var react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(117);\n/* harmony import */ var react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(36);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\nObject(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_4__["registerLanguage"])(\'jsx\', react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_5___default.a);\n\nvar stripNonNumeric = function stripNonNumeric(value) {\n  var str = \'\';\n\n  if (typeof value === \'undefined\') {\n    return \'\';\n  }\n\n  for (var i = 0; i < value.length; i++) {\n    var code = value.charCodeAt(i);\n\n    if (code > 47 && code < 58 || code === 43) {\n      str += value[i];\n    }\n  }\n\n  return str;\n};\n\nvar formatPhone = function formatPhone(value) {\n  return new libphonenumber_js__WEBPACK_IMPORTED_MODULE_2__[/* AsYouType */ "a"](\'US\').input(value);\n};\n\nvar toUpperCase = function toUpperCase(value) {\n  return value.replace(/[_-]{1,}/g, \'\').toUpperCase();\n};\n\nvar upCase = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_3__[/* createFormatter */ "h"])(toUpperCase, \'___-\', true);\n\nvar numbersOnly = function numbersOnly(value) {\n  return value.replace(/[^0-9]{1,}/g, \'\');\n};\n\nvar _moneyFormatter = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_3__[/* createFormatter */ "h"])(numbersOnly, \'___,\', true);\n\nvar moneyFormatter = function moneyFormatter(val, cur) {\n  var _moneyFormatter2 = _moneyFormatter(val, cur),\n      value = _moneyFormatter2[0],\n      cursor = _moneyFormatter2[1]; // Since we\'re prefixing the value, we have to increment the cursor.\n\n\n  return [\'$\' + value, cursor + 1];\n};\n\nvar Formatters =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(Formatters, _Component);\n\n  function Formatters() {\n    var _this;\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _Component.call.apply(_Component, [this].concat(args)) || this;\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {\n      formattedPhone: \'\'\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function (value, name) {\n      if (Object.keys(_this.state).includes(name) && _this.state[name] !== value) {\n        _this.setState(function (prevState) {\n          var _extends2;\n\n          return _extends({}, prevState, (_extends2 = {}, _extends2[name] = value, _extends2));\n        });\n      }\n    });\n\n    return _this;\n  }\n\n  var _proto = Formatters.prototype;\n\n  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {\n    return this.props !== nextProps || this.state !== nextState;\n  };\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Using Formatters"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Formatters can be supplied to fields, and they should be pure functions like:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_4___default.a, {\n      language: "javascript",\n      style: react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_6___default.a\n    }, "const formatter = (value) => value.toUpperCase();"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "E.g. the following field will type in all caps."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      placeholder: "This field will be all caps",\n      name: "allCapsField",\n      format: upCase,\n      unformat: function unformat(x) {\n        return x;\n      },\n      size: 30\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Phone Number Formatting"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This field is a US formatted phone number using ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "libphonenumber-js"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      label: "US Formatted Phone:\\xA0",\n      type: "text",\n      name: "formattedPhone",\n      placeholder: "(___) ___-____",\n      format: formatPhone,\n      unformat: stripNonNumeric,\n      onChange: this.update\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "Value: ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", {\n      style: {\n        display: \'inline-block\',\n        minWidth: \'5em\'\n      }\n    }, this.state.formattedPhone || \' \')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "Processed:", \' \', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", {\n      style: {\n        display: \'inline-block\',\n        minWidth: \'5em\'\n      }\n    }, stripNonNumeric(this.state.formattedPhone) || \' \'))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The code is pretty simple:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_4___default.a, {\n      language: "javascript",\n      style: react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_6___default.a\n    }, "\\nimport { AsYouType } from \'libphonenumber-js\';\\n\\nconst formatPhone = (value) => {\\n  return new AsYouType(\'US\').input(value);\\n};\\n\\nconst stripNonNumeric = value => {\\n  let str = \'\';\\n  for (let i = 0; i < value.length; i++) {\\n    const code = value.charCodeAt(i);\\n\\n    if ((code > 47 && code < 58) || code === 43) {\\n      str += value[i];\\n    }\\n  }\\n  return str;\\n};\\n\\n/* Eventually, render the component */\\n\\n<Field\\n  name=\\"formattedPhone\\"\\n  type=\\"text\\"\\n  label=\'US Formatted Phone:\'\\n  placeholder=\\"(___) ___-____\\"\\n  formatter={formatPhone}\\n  unformatter={stripNonNumeric}\\n/>\\n          ".trim()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      label: "Formatted Currency: ",\n      format: moneyFormatter,\n      type: "text",\n      name: "formattedCurrency"\n    }));\n  };\n\n  return Formatters;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__["hot"])(module)(Formatters));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(34)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/Formatters.js?')}}]);