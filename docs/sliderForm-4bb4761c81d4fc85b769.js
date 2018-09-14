(window.webpackJsonp = window.webpackJsonp || []).push([
  [7],
  Array(44).concat([
    function(module, exports, __webpack_require__) {
      eval(
        "var getNative = __webpack_require__(84);\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_nativeCreate.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var eq = __webpack_require__(156);\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_assocIndexOf.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var isKeyable = __webpack_require__(162);\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_getMapData.js?",
      );
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(module, exports, __webpack_require__) {
      eval(
        "var freeGlobal = __webpack_require__(142);\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_root.js?",
      );
    },
    function(module, exports) {
      eval(
        "/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/isObject.js?",
      );
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(module, exports, __webpack_require__) {
      eval(
        "var baseIsNative = __webpack_require__(141),\n    getValue = __webpack_require__(148);\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_getNative.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var baseGetTag = __webpack_require__(86),\n    isObject = __webpack_require__(61);\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/isFunction.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var Symbol = __webpack_require__(87),\n    getRawTag = __webpack_require__(143),\n    objectToString = __webpack_require__(144);\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_baseGetTag.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var root = __webpack_require__(60);\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_Symbol.js?',
      );
    },
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);\n/* harmony import */ var _swan_form_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(135);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n/* eslint-disable no-alert, react/prefer-stateless-function */\n\n\n // import \'@swan-form/slider/dist/Slider.css\';\n// import \'@swan-form/slider/dist/Slide.css\';\n\n\n\nvar required = function required(value) {\n  return value !== null && value !== undefined && value.trim() !== \'\' ? false : \'Required\';\n};\n\nvar onSubmit = function onSubmit(values) {\n  alert(JSON.stringify(values));\n  return values;\n};\n\nvar beforeSubmit = function beforeSubmit(values) {\n  return Promise.resolve(Object.keys(values).reduce(function (acc, key) {\n    var _extends2;\n\n    return _extends({}, acc, (_extends2 = {}, _extends2[key] = values[key].toUpperCase(), _extends2));\n  }, {}));\n};\n\nvar SliderForm =\n/*#__PURE__*/\nfunction (_Component) {\n  _inheritsLoose(SliderForm, _Component);\n\n  function SliderForm() {\n    return _Component.apply(this, arguments) || this;\n  }\n\n  var _proto = SliderForm.prototype;\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slider */ "b"], {\n      beforeSubmit: beforeSubmit,\n      onSubmit: onSubmit\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "A first question"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      type: "text",\n      name: "first-question",\n      validate: required,\n      size: 50,\n      placeholder: "This field is required"\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This slider has five slides. This one, two that we skip, and one with a submit button. After we", \' \', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "press"), " submit, we transform the value in the first to an uppercase string (", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "beforeSubmit"), ") that is passed to the actual submit (", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "onSubmit"), ") that is then logged to the console in the after submit method (", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "afterSubmit"), ")."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "A second question"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Field */ "a"], {\n      name: "first-question-a",\n      placeholder: "This field is required",\n      size: 50,\n      type: "text",\n      validate: required\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This is just another random question.")), ")}"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      beforeExitToNext: function beforeExitToNext(_ref) {\n        var getFormValues = _ref.getFormValues;\n        return new Promise(function (res) {\n          console.log(\'In beforeExitToNext hook\');\n          alert("You chose " + getFormValues().decisionTree);\n          res();\n        });\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Decision Tree"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Here are two radio buttons. If you choose the first one, you\'ll see the next slide and skip the one after that. If you choose the other one, you\'ll see the reverse."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* Radios */ "b"], {\n      validate: required,\n      name: "decisionTree",\n      options: [{\n        label: \'Next Slide\',\n        value: \'0\'\n      }, {\n        label: \'The Other One\',\n        value: \'1\'\n      }]\n    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      shouldShowIf: function shouldShowIf(_ref2) {\n        var decisionTree = _ref2.decisionTree;\n        return decisionTree === \'0\';\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "You chose the first slide."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "(This is a static message, in case you\'re wondering)."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      shouldShowIf: function shouldShowIf(_ref3) {\n        var decisionTree = _ref3.decisionTree;\n        return decisionTree === \'1\';\n      }\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "You skipped the last slide."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "(This is a static message, in case you\'re wondering)."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "A static slide"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This is a static slide. There is no need to set values in forms, so we don\'t need to use a render prop.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      render: function render(props) {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "These are all the values that were chosen"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, JSON.stringify(props.getFormValues(), null, 2)));\n      }\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_swan_form_slider__WEBPACK_IMPORTED_MODULE_2__[/* Slide */ "a"], {\n      shouldShowIf: function shouldShowIf() {\n        return false;\n      }\n    }, "This will never show, and the submit action should happen as we press next.")));\n  };\n\n  return SliderForm;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\n/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(SliderForm));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(34)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/SliderForm.js?',
      );
    },
    function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        '/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Slider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Slide; });\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(136);\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85);\n/* harmony import */ var lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isFunction__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(166);\n/* harmony import */ var lodash_clamp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_clamp__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _swan_form_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(42);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(35);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nvar _extendStatics = function extendStatics(e, t) {\n  return (_extendStatics = Object.setPrototypeOf || {\n    __proto__: []\n  } instanceof Array && function (e, t) {\n    e.__proto__ = t;\n  } || function (e, t) {\n    for (var r in t) {\n      t.hasOwnProperty(r) && (e[r] = t[r]);\n    }\n  })(e, t);\n};\n\nfunction __extends(e, t) {\n  function r() {\n    this.constructor = e;\n  }\n\n  _extendStatics(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r());\n}\n\nvar _assign = function __assign() {\n  return (_assign = Object.assign || function (e) {\n    for (var t, r = 1, n = arguments.length; r < n; r++) {\n      for (var o in t = arguments[r]) {\n        Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);\n      }\n    }\n\n    return e;\n  }).apply(this, arguments);\n};\n\nfunction __rest(e, t) {\n  var r = {};\n\n  for (var n in e) {\n    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);\n  }\n\n  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {\n    var o = 0;\n\n    for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) {\n      t.indexOf(n[o]) < 0 && (r[n[o]] = e[n[o]]);\n    }\n  }\n\n  return r;\n}\n\nvar alwaysTrue = function alwaysTrue() {\n  return !0;\n},\n    Slider = function (e) {\n  function t(t) {\n    var r = e.call(this, t) || this;\n    return r.setFormRef = function (e) {\n      r.form = e;\n    }, r.setCurrentSlideRef = function (e) {\n      r.currentSlide = e;\n    }, r.isCurrentSlideValid = function () {\n      var e = r.currentSlide;\n      return !e || !lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(e.isSlideValid) || e.isSlideValid();\n    }, r.getChildren = function () {\n      return react__WEBPACK_IMPORTED_MODULE_3__["Children"].toArray(r.props.children);\n    }, r.getFormValues = function () {\n      return r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.getValues) ? r.form.getValues() : {};\n    }, r.moveTo = function (e) {\n      r.mounted && r.setState({\n        current: e\n      });\n    }, r.next = function () {\n      if (r.isCurrentSlideValid()) {\n        var e = r.findNext();\n        if (e >= r.getChildren().length) return r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.handleOnSubmit) ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.form.doSubmit) : void 0;\n        var t = r.currentSlide.props,\n            n = t.beforeExit,\n            o = t.beforeExitToNext;\n        return lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(o) ? o(r.injectSlideProps).then(function () {\n          r.moveTo(e);\n        }) : lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(n) ? n(r.injectSlideProps).then(function () {\n          r.moveTo(e);\n        }) : r.moveTo(r.findNext());\n      }\n    }, r.prev = function () {\n      var e = r.findPrev();\n\n      if (e !== r.state.current) {\n        var t = r.currentSlide.props,\n            n = t.beforeExit,\n            o = t.beforeExitToPrev;\n        return lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(o) ? o(r.injectSlideProps).then(function () {\n          return r.moveTo(e);\n        }) : lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(n) ? n(r.injectSlideProps).then(function () {\n          return r.moveTo(e);\n        }) : void r.moveTo(e);\n      }\n    }, r.findNext = function () {\n      for (var e = r.state.current, t = r.getChildren(), n = r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.getValues) ? r.form.getValues() : {}, o = t.length - 1, i = e + 1; i <= o; i++) {\n        var s = t[i].props.shouldShowIf;\n        if ((void 0 === s ? alwaysTrue : s)(n)) return i;\n      }\n\n      return o + 1;\n    }, r.findPrev = function () {\n      for (var e = r.state.current, t = r.getChildren(), n = r.form && lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(r.form.getValues) ? r.form.getValues() : {}, o = e - 1; o >= 0; o--) {\n        var i = t[o].props.shouldShowIf;\n        if ((void 0 === i ? alwaysTrue : i)(n)) return o;\n      }\n\n      return 0;\n    }, r.handleEnd = function () {\n      r.form && Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.form.doSubmit);\n    }, r.state = {\n      current: lodash_clamp__WEBPACK_IMPORTED_MODULE_2___default()(t.current || 0, 0, react__WEBPACK_IMPORTED_MODULE_3__["Children"].count(t.children)) || 0\n    }, r.injectSlideProps = {\n      getFormValues: r.getFormValues,\n      nextSlide: r.next,\n      prevSlide: r.prev,\n      setRef: r.setCurrentSlideRef,\n      common: r.props.common\n    }, r.mounted = !1, r;\n  }\n\n  return __extends(t, e), t.prototype.componentDidMount = function () {\n    this.mounted = !0;\n  }, t.prototype.componentDidUpdate = function (e, t) {\n    var r = this.currentSlide.props,\n        n = r.didEnter,\n        o = r.didEnterAsPrev,\n        i = r.didEnterAsNext;\n    return t.current > this.state.current && o ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(o, this.injectSlideProps) : t.current < this.state.current && i ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(i, this.injectSlideProps) : n ? Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(n, this.injectSlideProps) : void 0;\n  }, t.prototype.componentWillUnmount = function () {\n    this.mounted = !1;\n  }, t.prototype.render = function () {\n    var e = this.props,\n        t = e.className,\n        r = e.formName,\n        n = e.PrevButton,\n        o = e.NextButton,\n        i = e.FinishButton,\n        s = e.onSubmit,\n        u = e.afterSubmit,\n        l = e.beforeSubmit,\n        c = e.autoComplete,\n        a = e.defaultValues,\n        f = this.state.current,\n        d = this.getChildren(),\n        m = d[f],\n        p = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(["sf--slider-control", "sf--slider-control-left"]),\n        h = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(["sf--slider-control", "sf--slider-control-right"]),\n        v = d.length - 1 === f,\n        S = v ? this.handleEnd : this.next;\n    return Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])(["sf--slider", t])\n    }, Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("button", {\n      type: "button",\n      className: p,\n      disabled: 0 === f,\n      onClick: this.prev\n    }, n), Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("button", {\n      type: "button",\n      className: h,\n      onClick: S\n    }, v ? i : o), Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_swan_form_form__WEBPACK_IMPORTED_MODULE_4__[/* Form */ "a"], {\n      name: r,\n      onSubmit: s,\n      beforeSubmit: l,\n      afterSubmit: u,\n      autoComplete: c,\n      persist: !0,\n      ref: this.setFormRef,\n      defaultValues: a\n    }, Object(react__WEBPACK_IMPORTED_MODULE_3__["cloneElement"])(m, this.injectSlideProps)));\n  }, t.defaultProps = {\n    autoComplete: "off",\n    afterSubmit: function afterSubmit(e) {\n      return Promise.resolve(e);\n    },\n    beforeSubmit: function beforeSubmit(e) {\n      return Promise.resolve(e);\n    },\n    commonProps: {},\n    current: 0,\n    defaultValues: {},\n    FinishButton: "→",\n    formName: "slider-form",\n    NextButton: "→",\n    PrevButton: "←"\n  }, t.displayName = "Slider", t;\n}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]),\n    emptyArray = [],\n    emptyObject = {},\n    alwaysTrue$1 = function alwaysTrue$1() {\n  return !0;\n},\n    Slide = function (e) {\n  function t(t) {\n    var r = e.call(this, t) || this;\n    return r.maybeAutoFocus = function () {\n      var e = Object.keys(r.fields)[0],\n          t = r.fields[e];\n      t && t.focus();\n    }, r.registerWithSlide = function (e) {\n      r.fields[e.name] = _assign({}, e);\n    }, r.unregisterFromSlide = function (e) {\n      var t = r.fields,\n          n = e,\n          o = (t[n], __rest(t, ["symbol" == typeof n ? n : n + ""]));\n      r.fields = o;\n    }, r.advance = function (e) {\n      var t = Object.keys(r.fields),\n          n = t.filter(function (t) {\n        return r.fields[t].getRef() === e.target;\n      })[0];\n\n      if (n) {\n        var o = t.indexOf(n),\n            i = t[o + 1];\n        i ? r.fields[i].focus() : Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.props.nextSlide);\n      }\n    }, r.retreat = function (e) {\n      var t = Object.keys(r.fields),\n          n = t.filter(function (t) {\n        return r.fields[t].getRef() === e.target;\n      })[0];\n\n      if (n) {\n        var o = t.indexOf(n),\n            i = t[o - 1];\n        i ? r.fields[i].focus() : Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.props.prevSlide);\n      }\n    }, r.isSlideValid = function () {\n      var e = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* gatherErrors */ "m"])(r.fields, !0);\n      return 0 === r.validateSlide(!0).length && 0 === e.length;\n    }, r.validateSlide = function (e) {\n      void 0 === e && (e = !1);\n      var t = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* execIfFunc */ "i"])(r.props.validate, Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* gatherValues */ "n"])(r.fields)),\n          n = Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* alwaysFilteredArray */ "d"])(t);\n      return r.mounted && e && r.setState({\n        errors: 0 === n.length ? emptyArray : n\n      }), n;\n    }, r.fields = {}, r.getSlideInterface = lodash_memoize__WEBPACK_IMPORTED_MODULE_0___default()(r.getSlideInterface.bind(r)), r.state = {\n      errors: emptyArray\n    }, lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(t.setRef) && t.setRef(r), r;\n  }\n\n  return __extends(t, e), t.prototype.componentDidMount = function () {\n    this.mounted = !0, this.maybeAutoFocus();\n  }, t.prototype.componentWillUnmount = function () {\n    this.mounted = !1;\n  }, t.prototype.getSlideInterface = function () {\n    return {\n      registerWithSlide: this.registerWithSlide,\n      unregisterFromSlide: this.unregisterFromSlide,\n      advance: this.advance,\n      retreat: this.retreat\n    };\n  }, t.prototype.render = function () {\n    var e = this.props,\n        t = e.className,\n        r = e.children,\n        n = e.style,\n        o = e.render,\n        i = void 0 === o ? r : o,\n        s = this.state.errors;\n    return Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* classes */ "f"])("sf--slide", s.length && "sf--slide-has-errors", t),\n      style: n\n    }, Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* SlideContext */ "c"].Provider, {\n      value: this.getSlideInterface()\n    }, lodash_isFunction__WEBPACK_IMPORTED_MODULE_1___default()(i) ? i(this.props) : i), Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n      className: "sf--slide-errors"\n    }, s.map(function (e) {\n      return Object(react__WEBPACK_IMPORTED_MODULE_3__["createElement"])("div", {\n        className: "sf--slide-error",\n        key: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_5__[/* toKey */ "x"])(e)\n      }, e);\n    })));\n  }, t.propTypes = {\n    autoFocus: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    beforeExit: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    beforeExitToNext: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    beforeExitToPrev: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    className: prop_types__WEBPACK_IMPORTED_MODULE_6__["string"],\n    didEnter: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    didEnterAsPrev: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    didEntereAsNext: prop_types__WEBPACK_IMPORTED_MODULE_6__["bool"],\n    render: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    shouldShowIf: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"],\n    style: prop_types__WEBPACK_IMPORTED_MODULE_6__["object"],\n    validate: prop_types__WEBPACK_IMPORTED_MODULE_6__["func"]\n  }, t.defaultProps = {\n    validate: function validate(e) {\n      return [];\n    },\n    className: "",\n    autoFocus: !0,\n    shouldShowIf: alwaysTrue$1,\n    style: emptyObject\n  }, t.displayName = "Slide", t;\n}(react__WEBPACK_IMPORTED_MODULE_3__["PureComponent"]);\n\n\n\n//# sourceURL=webpack:///../slider/dist/index.es.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var MapCache = __webpack_require__(137);\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/memoize.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var mapCacheClear = __webpack_require__(138),\n    mapCacheDelete = __webpack_require__(161),\n    mapCacheGet = __webpack_require__(163),\n    mapCacheHas = __webpack_require__(164),\n    mapCacheSet = __webpack_require__(165);\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_MapCache.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var Hash = __webpack_require__(139),\n    ListCache = __webpack_require__(153),\n    Map = __webpack_require__(160);\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_mapCacheClear.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var hashClear = __webpack_require__(140),\n    hashDelete = __webpack_require__(149),\n    hashGet = __webpack_require__(150),\n    hashHas = __webpack_require__(151),\n    hashSet = __webpack_require__(152);\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_Hash.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var nativeCreate = __webpack_require__(44);\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_hashClear.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var isFunction = __webpack_require__(85),\n    isMasked = __webpack_require__(145),\n    isObject = __webpack_require__(61),\n    toSource = __webpack_require__(147);\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_baseIsNative.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(38)))\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_freeGlobal.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var Symbol = __webpack_require__(87);\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_getRawTag.js?',
      );
    },
    function(module, exports) {
      eval(
        '/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_objectToString.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var coreJsData = __webpack_require__(146);\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_isMasked.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var root = __webpack_require__(60);\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_coreJsData.js?",
      );
    },
    function(module, exports) {
      eval(
        "/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_toSource.js?",
      );
    },
    function(module, exports) {
      eval(
        '/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_getValue.js?',
      );
    },
    function(module, exports) {
      eval(
        '/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_hashDelete.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var nativeCreate = __webpack_require__(44);\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_hashGet.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var nativeCreate = __webpack_require__(44);\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_hashHas.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var nativeCreate = __webpack_require__(44);\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_hashSet.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var listCacheClear = __webpack_require__(154),\n    listCacheDelete = __webpack_require__(155),\n    listCacheGet = __webpack_require__(157),\n    listCacheHas = __webpack_require__(158),\n    listCacheSet = __webpack_require__(159);\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_ListCache.js?",
      );
    },
    function(module, exports) {
      eval(
        '/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_listCacheClear.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var assocIndexOf = __webpack_require__(45);\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_listCacheDelete.js?',
      );
    },
    function(module, exports) {
      eval(
        "/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/eq.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var assocIndexOf = __webpack_require__(45);\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_listCacheGet.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var assocIndexOf = __webpack_require__(45);\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_listCacheHas.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var assocIndexOf = __webpack_require__(45);\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_listCacheSet.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var getNative = __webpack_require__(84),\n    root = __webpack_require__(60);\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_Map.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var getMapData = __webpack_require__(46);\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_mapCacheDelete.js?",
      );
    },
    function(module, exports) {
      eval(
        "/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_isKeyable.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var getMapData = __webpack_require__(46);\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_mapCacheGet.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var getMapData = __webpack_require__(46);\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_mapCacheHas.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var getMapData = __webpack_require__(46);\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_mapCacheSet.js?',
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        'var baseClamp = __webpack_require__(167),\n    toNumber = __webpack_require__(168);\n\n/**\n * Clamps `number` within the inclusive `lower` and `upper` bounds.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Number\n * @param {number} number The number to clamp.\n * @param {number} [lower] The lower bound.\n * @param {number} upper The upper bound.\n * @returns {number} Returns the clamped number.\n * @example\n *\n * _.clamp(-10, -5, 5);\n * // => -5\n *\n * _.clamp(10, -5, 5);\n * // => 5\n */\nfunction clamp(number, lower, upper) {\n  if (upper === undefined) {\n    upper = lower;\n    lower = undefined;\n  }\n  if (upper !== undefined) {\n    upper = toNumber(upper);\n    upper = upper === upper ? upper : 0;\n  }\n  if (lower !== undefined) {\n    lower = toNumber(lower);\n    lower = lower === lower ? lower : 0;\n  }\n  return baseClamp(toNumber(number), lower, upper);\n}\n\nmodule.exports = clamp;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/clamp.js?',
      );
    },
    function(module, exports) {
      eval(
        "/**\n * The base implementation of `_.clamp` which doesn't coerce arguments.\n *\n * @private\n * @param {number} number The number to clamp.\n * @param {number} [lower] The lower bound.\n * @param {number} upper The upper bound.\n * @returns {number} Returns the clamped number.\n */\nfunction baseClamp(number, lower, upper) {\n  if (number === number) {\n    if (upper !== undefined) {\n      number = number <= upper ? number : upper;\n    }\n    if (lower !== undefined) {\n      number = number >= lower ? number : lower;\n    }\n  }\n  return number;\n}\n\nmodule.exports = baseClamp;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/_baseClamp.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var isObject = __webpack_require__(61),\n    isSymbol = __webpack_require__(169);\n\n/** Used as references for various `Number` constants. */\nvar NAN = 0 / 0;\n\n/** Used to match leading and trailing whitespace. */\nvar reTrim = /^\\s+|\\s+$/g;\n\n/** Used to detect bad signed hexadecimal string values. */\nvar reIsBadHex = /^[-+]0x[0-9a-f]+$/i;\n\n/** Used to detect binary string values. */\nvar reIsBinary = /^0b[01]+$/i;\n\n/** Used to detect octal string values. */\nvar reIsOctal = /^0o[0-7]+$/i;\n\n/** Built-in method references without a dependency on `root`. */\nvar freeParseInt = parseInt;\n\n/**\n * Converts `value` to a number.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to process.\n * @returns {number} Returns the number.\n * @example\n *\n * _.toNumber(3.2);\n * // => 3.2\n *\n * _.toNumber(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toNumber(Infinity);\n * // => Infinity\n *\n * _.toNumber('3.2');\n * // => 3.2\n */\nfunction toNumber(value) {\n  if (typeof value == 'number') {\n    return value;\n  }\n  if (isSymbol(value)) {\n    return NAN;\n  }\n  if (isObject(value)) {\n    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;\n    value = isObject(other) ? (other + '') : other;\n  }\n  if (typeof value != 'string') {\n    return value === 0 ? value : +value;\n  }\n  value = value.replace(reTrim, '');\n  var isBinary = reIsBinary.test(value);\n  return (isBinary || reIsOctal.test(value))\n    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)\n    : (reIsBadHex.test(value) ? NAN : +value);\n}\n\nmodule.exports = toNumber;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/toNumber.js?",
      );
    },
    function(module, exports, __webpack_require__) {
      eval(
        "var baseGetTag = __webpack_require__(86),\n    isObjectLike = __webpack_require__(170);\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/isSymbol.js?",
      );
    },
    function(module, exports) {
      eval(
        "/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack:///../slider/node_modules/lodash/isObjectLike.js?",
      );
    },
  ]),
]);
