(window.webpackJsonp = window.webpackJsonp || []).push([
  [16],
  {
    352: function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      eval(
        "__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _swan_form_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);\n/* harmony import */ var _swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);\n/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var downshift__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(388);\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(353);\n/* harmony import */ var lodash_memoize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_memoize__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Downshift_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(32);\n/* harmony import */ var _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Downshift_scss__WEBPACK_IMPORTED_MODULE_6__);\nfunction _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\n\n\n\n\nvar items = [{\n  value: 'apple'\n}, {\n  value: 'pear'\n}, {\n  value: 'orange'\n}, {\n  value: 'grape'\n}, {\n  value: 'banana'\n}, 'kiwi'];\n\nvar Down = function Down() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n    width: \"24\",\n    height: \"24\",\n    viewBox: \"0 0 24 24\",\n    fill: \"none\",\n    stroke: \"#000\",\n    strokeWidth: \"2\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"polyline\", {\n    points: \"6 9 12 15 18 9\"\n  }));\n};\n\nvar Clear = function Clear() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n    viewBox: \"0 0 20 20\",\n    width: \"24\",\n    height: \"24\",\n    fill: \"none\",\n    stroke: \"black\",\n    strokeWidth: \"1\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n    d: \"M6,6 L13,13\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n    d: \"M13,6 L6,13\"\n  }));\n};\n\nvar normalizeOption = function normalizeOption(option) {\n  if (typeof option === 'string') {\n    return {\n      label: option,\n      value: option\n    };\n  }\n\n  if (typeof option === 'object') {\n    if (!Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* hasOwnProperty */ \"o\"])(option, 'label')) {\n      return _extends({}, option, {\n        label: option.value\n      });\n    }\n  }\n\n  return option;\n};\n\nvar normalizeOptions = function normalizeOptions(options) {\n  return options.map(normalizeOption);\n};\n\nvar getOptions = lodash_memoize__WEBPACK_IMPORTED_MODULE_5___default()(normalizeOptions);\n\nvar getItem = function getItem(_ref) {\n  var getItemProps = _ref.getItemProps,\n      item = _ref.item,\n      index = _ref.index,\n      highlightedIndex = _ref.highlightedIndex,\n      selectedItem = _ref.selectedItem;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", getItemProps({\n    key: item.value,\n    index: index,\n    item: item,\n    className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(highlightedIndex === index && _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.highlighted, selectedItem === item && _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.selected)\n  }), item.value);\n};\n\nvar getButton = function getButton(_ref2) {\n  var getToggleButtonProps = _ref2.getToggleButtonProps,\n      isOpen = _ref2.isOpen,\n      clearSelection = _ref2.clearSelection,\n      selectedItem = _ref2.selectedItem;\n  return selectedItem ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    type: \"button\",\n    onClick: clearSelection,\n    className: _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.toggleButton\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Clear, null)) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", _extends({}, getToggleButtonProps(), {\n    className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(_Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.toggleButton, isOpen && _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.isOpen)\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Down, null));\n};\n\nvar itemToString = function itemToString(item) {\n  return item && item.value ? item.value : '';\n};\n\nvar loftValue = function loftValue(fn) {\n  return function (item) {\n    return item && item.value ? fn(item.value) : fn(item);\n  };\n};\n\nvar states = ['AK', 'AL', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];\n\nvar SelectDownshift = function SelectDownshift(props) {\n  console.log(props);\n  var _options = props.options,\n      label = props.label,\n      errors = props.errors,\n      setValue = props.setValue,\n      value = props.value,\n      icon = props.icon,\n      filter = props.filter;\n  var options = getOptions(_options);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(downshift__WEBPACK_IMPORTED_MODULE_4__[/* default */ \"a\"], {\n    onChange: loftValue(setValue),\n    defaultInputValue: value,\n    defaultSelectedItem: value && {\n      value: value\n    },\n    itemToString: itemToString\n  }, function (_ref3) {\n    var getInputProps = _ref3.getInputProps,\n        getItemProps = _ref3.getItemProps,\n        getLabelProps = _ref3.getLabelProps,\n        getMenuProps = _ref3.getMenuProps,\n        isOpen = _ref3.isOpen,\n        inputValue = _ref3.inputValue,\n        highlightedIndex = _ref3.highlightedIndex,\n        selectedItem = _ref3.selectedItem,\n        getToggleButtonProps = _ref3.getToggleButtonProps,\n        clearSelection = _ref3.clearSelection;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.container\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", getLabelProps(), label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", getInputProps()), getButton({\n      selectedItem: selectedItem,\n      isOpen: isOpen,\n      getToggleButtonProps: getToggleButtonProps,\n      clearSelection: clearSelection\n    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", _extends({}, getMenuProps(), {\n      className: Object(_swan_form_helpers__WEBPACK_IMPORTED_MODULE_2__[/* classes */ \"f\"])(_Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.dropdown, isOpen && _Downshift_scss__WEBPACK_IMPORTED_MODULE_6___default.a.isOpen)\n    }), isOpen ? options.filter(function (item) {\n      return !inputValue || item.value.includes(inputValue);\n    }).map(function (item, index) {\n      return getItem({\n        getItemProps: getItemProps,\n        item: item,\n        index: index,\n        highlightedIndex: highlightedIndex,\n        selectedItem: selectedItem\n      });\n    }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"sf--errors\"\n    }, errors.map(function (error) {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        key: error,\n        className: \"sf-error\"\n      }, error);\n    })));\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"pre\", null, \"Value: \", JSON.stringify(value, null, 2)));\n};\n\nvar Select = Object(_swan_form_field__WEBPACK_IMPORTED_MODULE_1__[/* asField */ \"e\"])(SelectDownshift);\n\nvar DownshiftExample =\n/*#__PURE__*/\nfunction (_PureComponent) {\n  _inheritsLoose(DownshiftExample, _PureComponent);\n\n  function DownshiftExample() {\n    return _PureComponent.apply(this, arguments) || this;\n  }\n\n  var _proto = DownshiftExample.prototype;\n\n  _proto.render = function render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {\n      options: states,\n      label: \"Please enter a fruit\",\n      value: \"NY\"\n    });\n  };\n\n  return DownshiftExample;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"PureComponent\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__[\"hot\"])(module)(DownshiftExample));\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(34)(module)))\n\n//# sourceURL=webpack:///./src/components/pages/Downshift.js?",
      );
    },
  },
]);
