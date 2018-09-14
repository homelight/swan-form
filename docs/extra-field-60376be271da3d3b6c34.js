(window.webpackJsonp = window.webpackJsonp || []).push([
  [10],
  {
    237: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);\n/* harmony import */ var _swan_form_extra_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(238);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nvar defaultAddress = {\n  line1: \'350 5th Ave\',\n  line2: \'\',\n  city: \'New York\',\n  state: \'NY\',\n  zip: \'10118\'\n};\n\nvar DynamicField =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(DynamicField, _Component);\n\n  function DynamicField(props) {\n    var _this;\n\n    _this = _Component.call(this, props) || this;\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (values) {\n      console.log(\'Setting state with values\', values);\n\n      _this.setState(values);\n\n      return values;\n    });\n\n    _this.state = {};\n    return _this;\n  }\n\n  var _proto = DynamicField.prototype;\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Swan Form"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Here are some fields from the ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "@swan-form/extra-fields"), " package."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_form__WEBPACK_IMPORTED_MODULE_1__[/* Form */ "a"], {\n      name: "extraFields",\n      onSubmit: this.onSubmit\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_3__[/* Field */ "a"], {\n      name: "testfield",\n      type: "text",\n      value: "test"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_extra_fields__WEBPACK_IMPORTED_MODULE_2__[/* AddressField */ "a"], {\n      name: "addressField",\n      label: "Address Field",\n      defaultValue: defaultAddress,\n      autoFocus: true\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_3__[/* Submit */ "d"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_3__[/* Reset */ "c"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Press Submit to see the values"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, JSON.stringify(this.state, null, 2)));\n  };\n\n  return DynamicField;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(DynamicField));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/ExtraFields.js?',
      );
    },
    238: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressField$1; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);\n\n\n\nvar _extendStatics = function extendStatics(e, t) {\n  return (_extendStatics = Object.setPrototypeOf || {\n    __proto__: []\n  } instanceof Array && function (e, t) {\n    e.__proto__ = t;\n  } || function (e, t) {\n    for (var a in t) {\n      t.hasOwnProperty(a) && (e[a] = t[a]);\n    }\n  })(e, t);\n};\n\nfunction __extends(e, t) {\n  function a() {\n    this.constructor = e;\n  }\n\n  _extendStatics(e, t), e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype, new a());\n}\n\nvar _assign = function __assign() {\n  return (_assign = Object.assign || function (e) {\n    for (var t, a = 1, r = arguments.length; a < r; a++) {\n      for (var n in t = arguments[a]) {\n        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);\n      }\n    }\n\n    return e;\n  }).apply(this, arguments);\n},\n    states = ["----", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],\n    AddressField = function (e) {\n  function t() {\n    var t = null !== e && e.apply(this, arguments) || this;\n    return t.updatePart = function (e) {\n      var a,\n          r = e.target,\n          n = t.props,\n          l = n.name,\n          s = n.value,\n          i = n.setValue,\n          o = r.name.replace(l + "-", "");\n      Object.keys(s).includes(o) && s[o] !== r.value && i(_assign({}, s, ((a = {})[o] = r.value, a)));\n    }, t;\n  }\n\n  return __extends(t, e), t.prototype.render = function () {\n    var e = this.props,\n        t = e.autoFocus,\n        a = e.label,\n        r = e.name,\n        n = e.className,\n        l = e.value;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {\n      className: n\n    }, a && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, a), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      name: r + "-line1",\n      placeholder: "Line 1",\n      autoComplete: "address-line1",\n      onChange: this.updatePart,\n      value: l.line1,\n      register: !1,\n      required: !0,\n      autoFocus: t\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      name: r + "-line2",\n      onChange: this.updatePart,\n      autoComplete: "address-line2",\n      placeholder: "Line 2",\n      register: !1,\n      value: l.line2\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      name: r + "-city",\n      autoComplete: "address-level2",\n      onChange: this.updatePart,\n      placeholder: "City",\n      value: l.city,\n      register: !1,\n      required: !0\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "select",\n      name: r + "-state",\n      options: states,\n      onChange: this.updatePart,\n      autoComplete: "address-level1",\n      value: l.state,\n      register: !1,\n      required: !0\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      name: r + "-zip",\n      autoComplete: "postal-code",\n      onChange: this.updatePart,\n      placeholder: "Zip",\n      value: l.zip,\n      register: !1,\n      validate: function validate(e) {\n        return !e.trim() && "This field is required";\n      }\n    }));\n  }, t.displayName = "ComposedAddressField", t.defaultProps = {\n    autoFocus: !1,\n    value: {\n      line1: "",\n      line2: "",\n      city: "",\n      state: "",\n      zip: ""\n    },\n    className: ""\n  }, t;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]),\n    AddressField$1 = Object(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* asField */ "e"])(AddressField);\n\n\n\n//# sourceURL=webpack:///../extra-fields/dist/index.es.js?',
      );
    },
  },
]);
