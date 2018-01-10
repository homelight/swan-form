import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INPUT_TYPES = [
	'text',
	'password',
];

const COMMON_INPUT_PROPS = [
	'required',
	'pattern',
	'autoComplete', // find the list of possible ones
	'disabled',
	'readOnly',
	'maxLength',
	'placeholder',
	'checked',
];

const INPUT_TEXT_PROPS = [

];

const TEXTAREA_PROPS = [

];

const INPUT_NUMBER_PROPS = [

];

const FIELD_TYPES = [
	...INPUT_TYPES,
	'select',
	'textarea',
];

const isFunction = (func) => typeof func === 'function';

export default class Field extends Component {
	static defaultProps = {
		validateDebounceTimeout: 200,
	}

	static propTypes = {
		name: PropTypes.string.isRequired,
		type: PropTypes.oneOf(FIELD_TYPES).isRequired,
	}

	constructor(props) {
		super(props);

		this.state = {
			value: props.value || '',
			errors: [],
			isValid: true,
			isDirty: false,
			isTouched: false,
		};

		this.debounceValidateTimer = null;

		// Bind some handlers
		[ 'onChange', 'onBlur', 'onFocus' ].forEach((func) => {this[func] = this[func].bind(this)});
	}

	componentDidMount() {
		if (isFunction(this.props.register)) {
			this.register();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props === nextProps && this.state === nextState) {
			return false;
		}

		if (this.state.value !== nextState.value) {
			return true;
		}

		if (this.state.errors !== nextState.errors) {
			return true;
		}

		return false;
	}

	componentWillUnmount() {
		if (isFunction(this.props.unregister)) {
			this.unregister();
		}
	}

	getSpreadProps() {
		return COMMON_INPUT_PROPS.reduce((acc, prop) => {
			if (Object.prototype.hasOwnProperty.call(this.props, prop)) {
				acc[prop] = this.props[prop];
			}
			return acc;
		}, {});
	}

	format() {
		const { formatter } = this.props;
		const { value } = this.state;

		if (isFunction(formatter)) {
			return formatter(this.state.value);
		}

		return this.state.value;
	}

	validate() {
		const { validate } = this.props;

		let errors = [];
		if (Array.isArray(validate)) {
			return this.maybeUpdateErrors(validate.map(fn => {
				if (! isFunction(fn)) {
					return false;
				}
				return fn(this.state.value);
			}));
		}

		if (isFunction(validate)) {
			return this.maybeUpdateErrors(validate(this.state.value));
		}

		return this.maybeUpdateErrors(false);
	}

	maybeUpdateErrors(msg) {
		if (msg === false) {
			if (this.state.errors.length !== 0) {
				this.setState(prevState => ({
					...prevState,
					isValid: true,
					errors: [],
				}));
			}
		} else {
			this.setState(prevState => ({
				...prevState,
				isValid: false,
				errors: Array.isArray(msg) ? msg : [ msg ],
			}));
		}
	}

	onChange(event) {
		for (let key in event.target) {
			if (key.includes('Val')) {
				console.log(key, event.target[key]);
			}

		}
		if (! event.target.rawValue) {
			event.target.rawValue = event.target.value;;
		}
		const { value } = event.target;
		const { validateWhileTyping, validateDebounceTimeout, onChange } = this.props;

		if (validateWhileTyping) {
			window.clearTimeout(this.debounceValidateTimer);
			this.debounceValidateTimer = setTimeout(() => this.validate(), validateDebounceTimeout);
		}

		if (this.state.value !== value) {
			this.setState(prevState => ({
				...this.state,
				value,
				isDirty: this.state.value !== this.props.value,
			}));

			// Call user supplied function if given
			if (isFunction(onChange)) {
				onChange(value);
			}
		}
	}

	onFocus(event) {
		const { onFocus } = this.props;
		console.log('on focus');

		if (this.state.isTouched === false) {
			this.setState(prevState => ({
				...this.state,
				isTouched: true,
			}));
		}

		// Call user supplied function if given
		if (isFunction(onFocus)) {
			onFocus();
		}
	}

	onBlur(event) {
		const { onBlur, validate, asyncValidate } = this.props;
		console.log('on blur');

		if (asyncValidate && validate) {
			this.validate();
		}

		// Call user supplied function if given
		if (isFunction(onBlur)) {
			onBlur();
		}
	}

	maybeWrapInLabel(children) {
		if (this.props.label) {
			return (
				<label>
					<span className='flowform-field-label'>
						{this.props.label}
					</span>
					<span className='flowform-field-field'>
						{ children }
					</span>
					<span className='flowform-field-errors'>
						{this.state.errors.join(',')}
					</span>
				</label>
			);
		}
		return children;
	}

	register() {
		const { name, register } = this.props;
		if (isFunction(register)) {
			register({
				name,
				validate: this.validate,
				getValue: this.getValue,
				getRef: this.getRef,
			});
		}
	}

	unregister() {
		const { name } = this.props;
		if (isFunction(unregister)) {
			unregister({name});
		}
	}

	getValue() {
		return this.state.value;
	}

	getRef() {
		return this.fieldRef;
	}

	renderInputField() {
		const { name, type } = this.props;
		const { value } = this.state;
		return (
			<input
				name={ name }
				type={ type }
				value={ value }
				ref={ (el) => { this.fieldRef = el; } }

				onChange={ this.onChange }
				onBlur={ this.onBlur }
				onFocus={ this.onFocus }

				{ ...this.getSpreadProps() }
			/>
		);
	}

	renderTextArea() {
		const { name, type } = this.props;
		const { value } = this.state;

		return (
			<textarea
				name={ name }
				value={ value }
				onChange={ this.onChange }
				onBlur={ this.onBlur }
				onFocus={ this.onFocus }

				{ ...this.getSpreadProps() }
			/>
		)
	}

	render() {
		const { type } = this.props;
		if (INPUT_TYPES.includes(type)) {
			return this.maybeWrapInLabel(this.renderInputField());
		}
		return (
			<div>Field</div>
		);
	}
}