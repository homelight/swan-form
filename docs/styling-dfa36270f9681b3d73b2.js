(window.webpackJsonp = window.webpackJsonp || []).push([
  [13],
  {
    348: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);\n/* harmony import */ var react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(103);\n/* harmony import */ var react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(116);\n/* harmony import */ var react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_syntax_highlighter_languages_prism_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(349);\n/* harmony import */ var react_syntax_highlighter_languages_prism_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_languages_prism_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(117);\n/* harmony import */ var react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(36);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _Styling_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);\n/* harmony import */ var _Styling_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Styling_css__WEBPACK_IMPORTED_MODULE_7__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n/* eslint-disable react/prefer-stateless-function */\n\n\n\n\n\n\n\n\nObject(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2__["registerLanguage"])(\'jsx\', react_syntax_highlighter_languages_prism_jsx__WEBPACK_IMPORTED_MODULE_3___default.a);\nObject(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2__["registerLanguage"])(\'css\', react_syntax_highlighter_languages_prism_css__WEBPACK_IMPORTED_MODULE_4___default.a);\n\nvar minLenTen = function minLenTen(value) {\n  return value.length > 9 ? false : \'Min len 10\';\n};\n\nvar alphaNumeric = function alphaNumeric(value) {\n  return /^[a-zA-Z0-9]{1,}$/.test(value) ? false : \'Alpha Numeric\';\n};\n\nvar tenAndAlpha = [minLenTen, alphaNumeric];\n\nvar Styling =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(Styling, _Component);\n\n  function Styling() {\n    return _Component.apply(this, arguments) || this;\n  }\n\n  var _proto = Styling.prototype;\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Styling"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "Field"), " component creates HTML that is easily manipulable with CSS to make the fields pretty."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "For instance, using the following code snippet (with the input triggering the validation errors),"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2___default.a, {\n      language: "jsx",\n      style: react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_5___default.a\n    }, "\\n/* Validation functions */\\nconst minLenTen = value => (value.length > 9 ? false : \'Min len 10\');\\nconst alphaNumeric = value => (/^[a-zA-Z0-9]{1,}$/.test(value) ? false : \'Alpha Numeric\');\\nconst tenAndAlpha = [minLenTen, alphaNumeric];\\n\\n/* Create the field */\\n<Field\\n  type=\\"text\\"\\n  name=\\"minTenField\\"\\n  validate={tenAndAlpha}\\n  validateOnBlur\\n  placeholder=\\"Type Something\\"\\n  value=\\"testing_\\"\\n  required\\n  autoFocus\\n/>\\n        ".trim()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "will create the following HTML:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_syntax_highlighter_prism_light__WEBPACK_IMPORTED_MODULE_2___default.a, {\n      language: "jsx",\n      style: react_syntax_highlighter_styles_prism_prism__WEBPACK_IMPORTED_MODULE_5___default.a\n    }, "\\n<label class=\\"sf--field sf--field--required sf--field-has-errors\\">\\n  <span class=\\"sf--field--label\\">A Field</span>\\n  <span class=\\"sf--field--field\\">\\n    <input type=\\"text\\" value=\\"testing_\\" name=\\"minTenField\\" placeholder=\\"Type Something\\" required=\\"\\">\\n  </span>\\n  <span class=\\"sf--field--errors\\">\\n    <span class=\\"flowform-field-error\\">Min len 10</span>\\n    <span class=\\"flowform-field-error\\">Alpha Numeric</span>\\n  </span>\\n</label>".trim()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      label: "A Field",\n      type: "text",\n      name: "minTenField",\n      validate: tenAndAlpha,\n      validateOnBlur: true,\n      placeholder: "Type Something",\n      value: "testing_",\n      required: true\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      label: "We could instead use the label as a hint",\n      type: "text",\n      name: "minTenField",\n      className: "styled-reverse",\n      validate: tenAndAlpha,\n      validateOnBlur: true,\n      placeholder: "Type Something",\n      value: "testing_",\n      pattern: "[a-zA-Z0-9]{10,}",\n      required: true\n    })));\n  };\n\n  return Styling;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_6__["hot"])(module)(Styling));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(34)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/Styling.js?',
      );
    },
    349: function(module, exports, __webpack_require__) {
      'use strict';
      eval(
        '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _css = __webpack_require__(115);\n\nvar _css2 = _interopRequireDefault(_css);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n;\nexports.default = _css2.default;\n\n//# sourceURL=webpack:////Users/shawn/projects/swan-form/node_modules/react-syntax-highlighter/languages/prism/css.js?',
      );
    },
  },
]);
