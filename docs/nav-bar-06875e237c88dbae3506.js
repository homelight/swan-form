(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{386:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(392);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(391);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(122);\n/* harmony import */ var _redux_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81);\n/* harmony import */ var _NavBar_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(33);\n/* harmony import */ var _NavBar_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_NavBar_scss__WEBPACK_IMPORTED_MODULE_8__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */\n\n\n\n\n\n\n\n\n\n\nfunction createLink(path, name, pathname) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {\n    key: path,\n    to: path\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {\n    className: pathname === path ? _NavBar_scss__WEBPACK_IMPORTED_MODULE_8___default.a.active : \'\'\n  }, name));\n}\n\nvar NavBar =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(NavBar, _Component);\n\n  function NavBar() {\n    var _this;\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _Component.call.apply(_Component, [this].concat(args)) || this;\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle", function () {\n      var _this$props = _this.props,\n          isShowing = _this$props.isShowing,\n          hide = _this$props.hide,\n          show = _this$props.show;\n      (isShowing ? hide : show)();\n    });\n\n    return _this;\n  }\n\n  var _proto = NavBar.prototype;\n\n  _proto.render = function render() {\n    var pathname = this.props.location.pathname;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(_NavBar_scss__WEBPACK_IMPORTED_MODULE_8___default.a.navBar, !this.props.isShowing && _NavBar_scss__WEBPACK_IMPORTED_MODULE_8___default.a.hide)\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, _routes__WEBPACK_IMPORTED_MODULE_6__["pages"].map(function (_ref) {\n      var path = _ref[0],\n          name = _ref[1],\n          ignore = _ref.slice(2);\n\n      return createLink(path, name, pathname);\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      className: _NavBar_scss__WEBPACK_IMPORTED_MODULE_8___default.a.toggler,\n      onClick: this.toggle\n    }, this.props.isShowing ? \'↓ Hide ↓\' : \'↑ Show ↑\'));\n  };\n\n  return NavBar;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[/* connect */ "b"])(function (state) {\n  return {\n    isShowing: state.nav.show\n  };\n}, {\n  hide: _redux_nav__WEBPACK_IMPORTED_MODULE_7__[/* hide */ "b"],\n  show: _redux_nav__WEBPACK_IMPORTED_MODULE_7__[/* show */ "c"]\n})(NavBar)));\n\n//# sourceURL=webpack:///./src/components/NavBar.js?')}}]);