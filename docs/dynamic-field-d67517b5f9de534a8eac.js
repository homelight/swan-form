(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{236:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable react/no-multi-comp */\n\n\n\n/* @todo move this */\n\nvar minSize = {\n  minHeight: \'1em\',\n  minWidth: \'3em\'\n};\n\nvar EditableDisplay =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(EditableDisplay, _Component);\n\n  function EditableDisplay(props) {\n    var _this;\n\n    _this = _Component.call(this, props) || this;\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {\n      _this.setState(function (prevState) {\n        return _extends({}, prevState, {\n          editing: true\n        });\n      });\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event) {\n      if (event.key === \'Enter\') {\n        _this.onBlur(event);\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onBlur", function (event) {\n      var target = event.target;\n\n      if (target.name !== _this.props.name) {\n        return;\n      }\n\n      _this.props.onChange({\n        name: _this.props.name,\n        value: target.value\n      });\n\n      _this.setState(function (prevState) {\n        return _extends({}, prevState, {\n          editing: false,\n          value: target.value\n        });\n      });\n    });\n\n    _this.state = {\n      editing: false,\n      value: props.value\n    };\n    return _this;\n  }\n\n  var _proto = EditableDisplay.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        name = _this$props.name,\n        type = _this$props.type;\n\n    if (this.state.editing) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n        type: type || \'text\',\n        name: name,\n        value: this.state.value,\n        onKeyDown: this.onKeyDown,\n        onBlur: this.onBlur,\n        autoFocus: true\n      });\n    }\n\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      style: minSize,\n      onClick: this.onClick\n    }, this.state.value);\n  };\n\n  return EditableDisplay;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\nvar style = {\n  padding: \'.25em\',\n  border: \'1px solid black\',\n  margin: \'.25em\',\n  maxWidth: \'300px\'\n};\n\nvar DynamicField =\n/*#__PURE__*/\nfunction (_Component2) {\n  _inheritsLoose(DynamicField, _Component2);\n\n  function DynamicField(props) {\n    var _this2;\n\n    _this2 = _Component2.call(this, props) || this;\n    _this2.state = {\n      field1: \'HiHi\',\n      field2: \'What\',\n      field3: \'Something Else\',\n      field4: \'\'\n    };\n    _this2.update = _this2.update.bind(_assertThisInitialized(_assertThisInitialized(_this2)));\n    return _this2;\n  }\n\n  var _proto2 = DynamicField.prototype;\n\n  _proto2.update = function update(_ref) {\n    var name = _ref.name,\n        value = _ref.value;\n    this.setState(function (prevState) {\n      var _extends2;\n\n      return _extends({}, prevState, (_extends2 = {}, _extends2[name] = value, _extends2));\n    });\n  };\n\n  _proto2.render = function render() {\n    var _this$state = this.state,\n        field1 = _this$state.field1,\n        field2 = _this$state.field2,\n        field3 = _this$state.field3,\n        field4 = _this$state.field4;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Swan Form"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Not really a dynamic field yet."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      style: style\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditableDisplay, {\n      name: "field1",\n      value: field1,\n      onChange: this.update\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      style: style\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditableDisplay, {\n      name: "field4",\n      value: field4,\n      type: "date",\n      onChange: this.update\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      style: style\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditableDisplay, {\n      name: "field2",\n      value: field2,\n      onChange: this.update\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n      style: style\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditableDisplay, {\n      name: "field3",\n      value: field3,\n      onChange: this.update\n    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "State"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, JSON.stringify(this.state, null, 2)));\n  };\n\n  return DynamicField;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(DynamicField));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/DynamicField.js?')}}]);