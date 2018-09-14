(window.webpackJsonp = window.webpackJsonp || []).push([
  [6],
  {
    122: function(module, exports, __webpack_require__) {
      eval(
        'var baseClamp = __webpack_require__(123),\n    toNumber = __webpack_require__(124);\n\n/**\n * Clamps `number` within the inclusive `lower` and `upper` bounds.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Number\n * @param {number} number The number to clamp.\n * @param {number} [lower] The lower bound.\n * @param {number} upper The upper bound.\n * @returns {number} Returns the clamped number.\n * @example\n *\n * _.clamp(-10, -5, 5);\n * // => -5\n *\n * _.clamp(10, -5, 5);\n * // => 5\n */\nfunction clamp(number, lower, upper) {\n  if (upper === undefined) {\n    upper = lower;\n    lower = undefined;\n  }\n  if (upper !== undefined) {\n    upper = toNumber(upper);\n    upper = upper === upper ? upper : 0;\n  }\n  if (lower !== undefined) {\n    lower = toNumber(lower);\n    lower = lower === lower ? lower : 0;\n  }\n  return baseClamp(toNumber(number), lower, upper);\n}\n\nmodule.exports = clamp;\n\n\n//# sourceURL=webpack:////Users/shawn/projects/swan-form/node_modules/lodash/clamp.js?',
      );
    },
    123: function(module, exports) {
      eval(
        "/**\n * The base implementation of `_.clamp` which doesn't coerce arguments.\n *\n * @private\n * @param {number} number The number to clamp.\n * @param {number} [lower] The lower bound.\n * @param {number} upper The upper bound.\n * @returns {number} Returns the clamped number.\n */\nfunction baseClamp(number, lower, upper) {\n  if (number === number) {\n    if (upper !== undefined) {\n      number = number <= upper ? number : upper;\n    }\n    if (lower !== undefined) {\n      number = number >= lower ? number : lower;\n    }\n  }\n  return number;\n}\n\nmodule.exports = baseClamp;\n\n\n//# sourceURL=webpack:////Users/shawn/projects/swan-form/node_modules/lodash/_baseClamp.js?",
      );
    },
    124: function(module, exports, __webpack_require__) {
      eval(
        "var isObject = __webpack_require__(32),\n    isSymbol = __webpack_require__(125);\n\n/** Used as references for various `Number` constants. */\nvar NAN = 0 / 0;\n\n/** Used to match leading and trailing whitespace. */\nvar reTrim = /^\\s+|\\s+$/g;\n\n/** Used to detect bad signed hexadecimal string values. */\nvar reIsBadHex = /^[-+]0x[0-9a-f]+$/i;\n\n/** Used to detect binary string values. */\nvar reIsBinary = /^0b[01]+$/i;\n\n/** Used to detect octal string values. */\nvar reIsOctal = /^0o[0-7]+$/i;\n\n/** Built-in method references without a dependency on `root`. */\nvar freeParseInt = parseInt;\n\n/**\n * Converts `value` to a number.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to process.\n * @returns {number} Returns the number.\n * @example\n *\n * _.toNumber(3.2);\n * // => 3.2\n *\n * _.toNumber(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toNumber(Infinity);\n * // => Infinity\n *\n * _.toNumber('3.2');\n * // => 3.2\n */\nfunction toNumber(value) {\n  if (typeof value == 'number') {\n    return value;\n  }\n  if (isSymbol(value)) {\n    return NAN;\n  }\n  if (isObject(value)) {\n    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;\n    value = isObject(other) ? (other + '') : other;\n  }\n  if (typeof value != 'string') {\n    return value === 0 ? value : +value;\n  }\n  value = value.replace(reTrim, '');\n  var isBinary = reIsBinary.test(value);\n  return (isBinary || reIsOctal.test(value))\n    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)\n    : (reIsBadHex.test(value) ? NAN : +value);\n}\n\nmodule.exports = toNumber;\n\n\n//# sourceURL=webpack:////Users/shawn/projects/swan-form/node_modules/lodash/toNumber.js?",
      );
    },
    125: function(module, exports, __webpack_require__) {
      eval(
        "var baseGetTag = __webpack_require__(29),\n    isObjectLike = __webpack_require__(30);\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack:////Users/shawn/projects/swan-form/node_modules/lodash/isSymbol.js?",
      );
    },
    97: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);\n/* harmony import */ var _swan_form_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n/* eslint-disable no-alert, react/prefer-stateless-function */\n\n\n // import \'@swan-form/slider/dist/Slider.css\';\n// import \'@swan-form/slider/dist/Slide.css\';\n\n\n\nvar required = function required(value) {\n  return value !== null && value !== undefined && value.trim() !== \'\' ? false : \'Required\';\n};\n\nvar onSubmit = function onSubmit(values) {\n  alert(JSON.stringify(values));\n  return values;\n};\n\nvar beforeSubmit = function beforeSubmit(values) {\n  return Promise.resolve(Object.keys(values).reduce(function (acc, key) {\n    var _extends2;\n\n    return _extends({}, acc, (_extends2 = {}, _extends2[key] = values[key].toUpperCase(), _extends2));\n  }, {}));\n};\n\nvar SliderForm =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(SliderForm, _Component);\n\n  function SliderForm() {\n    return _Component.apply(this, arguments) || this;\n  }\n\n  var _proto = SliderForm.prototype;\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slider */ "b"], {\n      beforeSubmit: beforeSubmit,\n      onSubmit: onSubmit\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "A first question"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      name: "first-question",\n      validate: required,\n      size: 50,\n      placeholder: "This field is required"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This slider has five slides. This one, two that we skip, and one with a submit button. After we", \' \', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "press"), " submit, we transform the value in the first to an uppercase string (", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "beforeSubmit"), ") that is passed to the actual submit (", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "onSubmit"), ") that is then logged to the console in the after submit method (", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "afterSubmit"), ")."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "A second question"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      name: "first-question-a",\n      placeholder: "This field is required",\n      size: 50,\n      type: "text",\n      validate: required\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This is just another random question.")), ")}"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      beforeExitToNext: function beforeExitToNext(_ref) {\n        var getFormValues = _ref.getFormValues;\n        return new Promise(function (res) {\n          console.log(\'In beforeExitToNext hook\');\n          alert("You chose " + getFormValues().decisionTree);\n          res();\n        });\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Decision Tree"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Here are two radio buttons. If you choose the first one, you\'ll see the next slide and skip the one after that. If you choose the other one, you\'ll see the reverse."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Radios */ "b"], {\n      validate: required,\n      name: "decisionTree",\n      options: [{\n        label: \'Next Slide\',\n        value: \'0\'\n      }, {\n        label: \'The Other One\',\n        value: \'1\'\n      }]\n    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      shouldShowIf: function shouldShowIf(_ref2) {\n        var decisionTree = _ref2.decisionTree;\n        return decisionTree === \'0\';\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "You chose the first slide."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "(This is a static message, in case you\'re wondering)."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      shouldShowIf: function shouldShowIf(_ref3) {\n        var decisionTree = _ref3.decisionTree;\n        return decisionTree === \'1\';\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "You skipped the last slide."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "(This is a static message, in case you\'re wondering)."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "A static slide"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This is a static slide. There is no need to set values in forms, so we don\'t need to use a render prop.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      render: function render(props) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "These are all the values that were chosen"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, JSON.stringify(props.getFormValues(), null, 2)));\n      }\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      shouldShowIf: function shouldShowIf() {\n        return false;\n      }\n    }, "This will never show, and the submit action should happen as we press next.")));\n  };\n\n  return SliderForm;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(SliderForm));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/SliderForm.js?',
      );
    },
    98: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Slider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Slide; });\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);\n/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122);\n/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_clamp__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _swan_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nvar _extendStatics = function extendStatics(e, t) {\n  return (_extendStatics = Object.setPrototypeOf || {\n    __proto__: []\n  } instanceof Array && function (e, t) {\n    e.__proto__ = t;\n  } || function (e, t) {\n    for (var r in t) {\n      t.hasOwnProperty(r) && (e[r] = t[r]);\n    }\n  })(e, t);\n};\n\nfunction __extends(e, t) {\n  function r() {\n    this.constructor = e;\n  }\n\n  _extendStatics(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());\n}\n\nvar _assign = function __assign() {\n  return (_assign = Object.assign || function (e) {\n    for (var t, r = 1, n = arguments.length; r < n; r++) {\n      for (var o in t = arguments[r]) {\n        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);\n      }\n    }\n\n    return e;\n  }).apply(this, arguments);\n};\n\nfunction __rest(e, t) {\n  var r = {};\n\n  for (var n in e) {\n    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);\n  }\n\n  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {\n    var o = 0;\n\n    for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) {\n      t.indexOf(n[o]) < 0 && (r[n[o]] = e[n[o]]);\n    }\n  }\n\n  return r;\n}\n\nvar alwaysTrue = function alwaysTrue() {\n  return !0;\n},\n    Slider = function (e) {\n  function t(t) {\n    var r = e.call(this, t) || this;\n    return r.setFormRef = function (e) {\n      r.form = e;\n    }, r.setCurrentSlideRef = function (e) {\n      r.currentSlide = e;\n    }, r.isCurrentSlideValid = function () {\n      var e = r.currentSlide;\n      return !e || !lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(e.isSlideValid) || e.isSlideValid();\n    }, r.getChildren = function () {\n      return react__WEBPACK_IMPORTED_MODULE_3__["Children"].toArray(r.props.children);\n    }, r.getFormValues = function () {\n      return r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.getValues) ? r.form.getValues() : {};\n    }, r.moveTo = function (e) {\n      r.mounted && r.setState({\n        current: e\n      });\n    }, r.next = function () {\n      if (r.isCurrentSlideValid()) {\n        var e = r.findNext();\n        if (e >= r.getChildren().length) return r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.handleOnSubmit) ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.form.doSubmit) : void 0;\n        var t = r.currentSlide.props,\n            n = t.beforeExit,\n            o = t.beforeExitToNext;\n        return lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(o) ? o(r.injectSlideProps).then(function () {\n          r.moveTo(e);\n        }) : lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(n) ? n(r.injectSlideProps).then(function () {\n          r.moveTo(e);\n        }) : r.moveTo(r.findNext());\n      }\n    }, r.prev = function () {\n      var e = r.findPrev();\n\n      if (e !== r.state.current) {\n        var t = r.currentSlide.props,\n            n = t.beforeExit,\n            o = t.beforeExitToPrev;\n        return lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(o) ? o(r.injectSlideProps).then(function () {\n          return r.moveTo(e);\n        }) : lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(n) ? n(r.injectSlideProps).then(function () {\n          return r.moveTo(e);\n        }) : void r.moveTo(e);\n      }\n    }, r.findNext = function () {\n      for (var e = r.state.current, t = r.getChildren(), n = r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.getValues) ? r.form.getValues() : {}, o = t.length - 1, i = e + 1; i <= o; i++) {\n        var s = t[i].props.shouldShowIf;\n        if ((void 0 === s ? alwaysTrue : s)(n)) return i;\n      }\n\n      return o + 1;\n    }, r.findPrev = function () {\n      for (var e = r.state.current, t = r.getChildren(), n = r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.getValues) ? r.form.getValues() : {}, o = e - 1; o >= 0; o--) {\n        var i = t[o].props.shouldShowIf;\n        if ((void 0 === i ? alwaysTrue : i)(n)) return o;\n      }\n\n      return 0;\n    }, r.handleEnd = function () {\n      r.form && Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.form.doSubmit);\n    }, r.state = {\n      current: lodash_clamp__WEBPACK_IMPORTED_MODULE_2___default()(t.current || 0, 0, react__WEBPACK_IMPORTED_MODULE_3__["Children"].count(t.children)) || 0\n    }, r.injectSlideProps = {\n      getFormValues: r.getFormValues,\n      nextSlide: r.next,\n      prevSlide: r.prev,\n      setRef: r.setCurrentSlideRef,\n      common: r.props.common\n    }, r.mounted = !1, r;\n  }\n\n  return __extends(t, e), t.prototype.componentDidMount = function () {\n    this.mounted = !0;\n  }, t.prototype.componentDidUpdate = function (e, t) {\n    var r = this.currentSlide.props,\n        n = r.didEnter,\n        o = r.didEnterAsPrev,\n        i = r.didEnterAsNext;\n    return t.current > this.state.current && o ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(o, this.injectSlideProps) : t.current < this.state.current && i ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(i, this.injectSlideProps) : n ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(n, this.injectSlideProps) : void 0;\n  }, t.prototype.componentWillUnmount = function () {\n    this.mounted = !1;\n  }, t.prototype.render = function () {\n    var e = this.props,\n        t = e.className,\n        r = e.formName,\n        n = e.PrevButton,\n        o = e.NextButton,\n        i = e.FinishButton,\n        s = e.onSubmit,\n        u = e.afterSubmit,\n        l = e.beforeSubmit,\n        c = e.autoComplete,\n        a = e.defaultValues,\n        f = this.state.current,\n        d = this.getChildren(),\n        m = d[f],\n        p = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(["sf--slider-control", "sf--slider-control-left"]),\n        h = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(["sf--slider-control", "sf--slider-control-right"]),\n        v = d.length - 1 === f,\n        S = v ? this.handleEnd : this.next;\n    return Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(["sf--slider", t])\n    }, Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("button", {\n      type: "button",\n      className: p,\n      disabled: 0 === f,\n      onClick: this.prev\n    }, n), Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("button", {\n      type: "button",\n      className: h,\n      onClick: S\n    }, v ? i : o), Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_swan_form_form__WEBPACK_IMPORTED_MODULE_4__[/* Form */ "a"], {\n      name: r,\n      onSubmit: s,\n      beforeSubmit: l,\n      afterSubmit: u,\n      autoComplete: c,\n      persist: !0,\n      ref: this.setFormRef,\n      defaultValues: a\n    }, Object(react__WEBPACK_IMPORTED_MODULE_3__["cloneElement"])(m, this.injectSlideProps)));\n  }, t.defaultProps = {\n    autoComplete: "off",\n    afterSubmit: function afterSubmit(e) {\n      return Promise.resolve(e);\n    },\n    beforeSubmit: function beforeSubmit(e) {\n      return Promise.resolve(e);\n    },\n    commonProps: {},\n    current: 0,\n    defaultValues: {},\n    FinishButton: "→",\n    formName: "slider-form",\n    NextButton: "→",\n    PrevButton: "←"\n  }, t.displayName = "Slider", t;\n}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]),\n    emptyArray = [],\n    emptyObject = {},\n    alwaysTrue$1 = function alwaysTrue$1() {\n  return !0;\n},\n    Slide = function (e) {\n  function t(t) {\n    var r = e.call(this, t) || this;\n    return r.maybeAutoFocus = function () {\n      var e = Object.keys(r.fields)[0],\n          t = r.fields[e];\n      t && t.focus();\n    }, r.registerWithSlide = function (e) {\n      r.fields[e.name] = _assign({}, e);\n    }, r.unregisterFromSlide = function (e) {\n      var t = r.fields,\n          n = e,\n          o = (t[n], __rest(t, ["symbol" == typeof n ? n : n + ""]));\n      r.fields = o;\n    }, r.advance = function (e) {\n      var t = Object.keys(r.fields),\n          n = t.filter(function (t) {\n        return r.fields[t].getRef() === e.target;\n      })[0];\n\n      if (n) {\n        var o = t.indexOf(n),\n            i = t[o + 1];\n        i ? r.fields[i].focus() : Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.props.nextSlide);\n      }\n    }, r.retreat = function (e) {\n      var t = Object.keys(r.fields),\n          n = t.filter(function (t) {\n        return r.fields[t].getRef() === e.target;\n      })[0];\n\n      if (n) {\n        var o = t.indexOf(n),\n            i = t[o - 1];\n        i ? r.fields[i].focus() : Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.props.prevSlide);\n      }\n    }, r.isSlideValid = function () {\n      var e = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* gatherErrors */ "m"])(r.fields, !0);\n      return 0 === r.validateSlide(!0).length && 0 === e.length;\n    }, r.validateSlide = function (e) {\n      void 0 === e && (e = !1);\n      var t = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.props.validate, Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* gatherValues */ "n"])(r.fields)),\n          n = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* alwaysFilteredArray */ "d"])(t);\n      return r.mounted && e && r.setState({\n        errors: 0 === n.length ? emptyArray : n\n      }), n;\n    }, r.fields = {}, r.getSlideInterface = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(r.getSlideInterface.bind(r)), r.state = {\n      errors: emptyArray\n    }, lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(t.setRef) && t.setRef(r), r;\n  }\n\n  return __extends(t, e), t.prototype.componentDidMount = function () {\n    this.mounted = !0, this.maybeAutoFocus();\n  }, t.prototype.componentWillUnmount = function () {\n    this.mounted = !1;\n  }, t.prototype.getSlideInterface = function () {\n    return {\n      registerWithSlide: this.registerWithSlide,\n      unregisterFromSlide: this.unregisterFromSlide,\n      advance: this.advance,\n      retreat: this.retreat\n    };\n  }, t.prototype.render = function () {\n    var e = this.props,\n        t = e.className,\n        r = e.children,\n        n = e.style,\n        o = e.render,\n        i = void 0 === o ? r : o,\n        s = this.state.errors;\n    return Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])("sf--slide", s.length && "sf--slide-has-errors", t),\n      style: n\n    }, Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* SlideContext */ "c"].Provider, {\n      value: this.getSlideInterface()\n    }, lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(i) ? i(this.props) : i), Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n      className: "sf--slide-errors"\n    }, s.map(function (e) {\n      return Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n        className: "sf--slide-error",\n        key: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* toKey */ "x"])(e)\n      }, e);\n    })));\n  }, t.propTypes = {\n    autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    beforeExit: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    beforeExitToNext: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    beforeExitToPrev: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    className: prop_types__WEBPACK_IMPORTED_MODULE_6__["string"],\n    didEnter: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    didEnterAsPrev: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    didEntereAsNext: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    render: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    shouldShowIf: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    style: prop_types__WEBPACK_IMPORTED_MODULE_6__["object"],\n    validate: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"]\n  }, t.defaultProps = {\n    validate: function validate(e) {\n      return [];\n    },\n    className: "",\n    autoFocus: !0,\n    shouldShowIf: alwaysTrue$1,\n    style: emptyObject\n  }, t.displayName = "Slide", t;\n}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]);\n\n\n\n//# sourceURL=webpack:///../slider/dist/index.es.js?',
      );
    },
  },
]);
