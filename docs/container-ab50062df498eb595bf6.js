(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{133:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);\n/* harmony import */ var _Container_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);\n/* harmony import */ var _Container_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Container_scss__WEBPACK_IMPORTED_MODULE_5__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\n\n\nvar NavBar = Object(_Loader__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(function () {\n  return Promise.all(/* import() | nav-bar */[__webpack_require__.e(1), __webpack_require__.e(22), __webpack_require__.e(18)]).then(__webpack_require__.bind(null, 388));\n}, null);\n\nvar Container =\n/*#__PURE__*/\nfunction (_PureComponent) {\n  _inheritsLoose(Container, _PureComponent);\n\n  function Container() {\n    return _PureComponent.apply(this, arguments) || this;\n  }\n\n  var _proto = Container.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        navVisible = _this$props.navVisible,\n        children = _this$props.children;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavBar, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_3__[/* classes */ "f"])(_Container_scss__WEBPACK_IMPORTED_MODULE_5___default.a.container, navVisible && _Container_scss__WEBPACK_IMPORTED_MODULE_5___default.a.navVisible)\n    }, children));\n  };\n\n  return Container;\n}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[/* connect */ "b"])(function (state) {\n  return {\n    navVisible: state.nav.show\n  };\n})(Container));\n\n//# sourceURL=webpack:///./src/components/Container.js?')}}]);