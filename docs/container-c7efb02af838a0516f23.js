(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{133:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);\n/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);\n/* harmony import */ var _Container_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);\n/* harmony import */ var _Container_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Container_scss__WEBPACK_IMPORTED_MODULE_3__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\n\n\n\n\nvar NavBar = Object(_Loader__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(function () {\n  return Promise.all(/* import() | nav-bar */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(22), __webpack_require__.e(18)]).then(__webpack_require__.bind(null, 386));\n}, null);\n\nvar Container =\n/*#__PURE__*/\nfunction (_PureComponent) {\n  _inheritsLoose(Container, _PureComponent);\n\n  function Container() {\n    return _PureComponent.apply(this, arguments) || this;\n  }\n\n  var _proto = Container.prototype;\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavBar, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      className: [_Container_scss__WEBPACK_IMPORTED_MODULE_3___default.a.container, this.props.navVisible && _Container_scss__WEBPACK_IMPORTED_MODULE_3___default.a.navVisible].filter(function (O) {\n        return O;\n      }).join(\' \')\n    }, this.props.children));\n  };\n\n  return Container;\n}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[/* connect */ "b"])(function (state) {\n  return {\n    navVisible: state.nav.show\n  };\n})(Container));\n\n//# sourceURL=webpack:///./src/components/Container.js?')}}]);