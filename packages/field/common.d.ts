export type StrFalseArr = (string | false)[];

export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement | HTMLElement;

export type FieldKeyboardEvent = React.SyntheticEvent<React.KeyboardEvent<FieldElement>>;

export type GenericFocusEvent = React.FocusEvent<FieldElement>;

export type GenericChangeEvent = React.FormEvent<FieldElement>;

export type GenericClickEvent = React.MouseEvent<FieldElement>;

export type ValidateFn = (value: any) => false | false;

export interface FieldInterface {
  name: string;
  getRef(): HTMLElement;
  getValue(): any;
  setValue(value: any): void;
  validate(): StrFalseArr;
  isValid(): boolean;
  reset(): void;
}

export interface AsFieldProps {
  name: string;
  type: string; // @todo expand this
  value?: any;
  validate?: ValidateFn | ValidateFn[];
  multiple?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  doNotRegister?: boolean;
  asyncValidate?: boolean;
  validateWhileTyping?: boolean;
  validateDebounceTimeout?: number;
  checked?: boolean;
  onChange?(newValue: any, name: string): void;
  onClick?(target: FieldElement): void;
  onFocus?(target: FieldElement): void;
  onBlur?(target: FieldElement): void;
  handleKeyPress?(event: FieldKeyboardEvent): void;
  setRef?(el: FieldElement): void;
  format?(value: any, cursor?: number): any;
  unformat?(value: any): any;
  registerWrapped?: boolean;
  handleEnterKey?(event: FieldKeyboardEvent): void;
  [key: string]: any;
}

export interface WrappedComponentProps {
  onChange(event: GenericChangeEvent): void;
  onInput(event: GenericChangeEvent): void;
  onBlur(event: GenericFocusEvent): void;
  onFocus(event: GenericFocusEvent): void;
  onClick(event: GenericClickEvent): void;
  setRef(element: FieldElement): void;
  getValue(): any;
  setValue(value: any): void;
  ref: any; // more strong type this
  value: any;
  errors: string[];
  isValid: boolean;
  [key: string]: any;
}

export interface FieldProps extends WrappedComponentProps {
  type: string;
  name: string;
  value: any;
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  errors: string[];
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;

  style?: React.CSSProperties;
  options?: any;
  getValue(): any;
  setValue(value: any): void;
  setRef(element: HTMLElement): void;
  isValid: boolean;

  // onInput?(): void;
  // onChange?(): void;
  // onFocus?(): void;
  // onBlur?(): void;
  // onClick?(): void;
}

export interface AsFieldState {
  value: any;
  cursor?: number;
  errors: string[];
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  checked: boolean;
}
