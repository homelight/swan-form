export type StrFalseArr = (string | false)[];

export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement | HTMLElement;

export type FieldKeyboardEvent = React.SyntheticEvent<React.KeyboardEvent<FieldElement>>;

export type GenericFocusEvent = React.FocusEvent<FieldElement>;

export type GenericChangeEvent = React.FormEvent<FieldElement>;

export type GenericClickEvent = React.MouseEvent<FieldElement>;

export interface FieldInterface {
  name: string;
  getRef(): HTMLElement;
  getValue(): any;
  setValue(value: any): void;
  validate(): StrFalseArr;
  isValid(): boolean;
  reset(): void;
}

export interface BoolObject {}

export interface AsFieldProps {
  name: string;
  type: string; // @todo expand this
  value?: any;
  defaultValue?: any;
  validate?: ((value: any) => string | false) | ((value: any) => string | false)[];
  multiple?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  doNotRegister?: boolean;
  asyncValidate?: boolean;
  validateWhileTyping?: boolean;
  validateDebounceTimeout?: number;
  checked?: boolean;
  onChange(event: GenericChangeEvent): void;
  onClick(event: GenericClickEvent): void;
  onFocus(event: GenericFocusEvent): void;
  onBlur(event: GenericFocusEvent): void;
  // onChange?(newValue: any, name: string): void;
  // onClick?(target: FieldElement): void;
  // onFocus?(target: FieldElement): void;
  // onBlur?(target: FieldElement): void;
  // handleKeyPress?(event: FieldKeyboardEvent): void;
  handleKeyPress?(
    keyCode: number,
    modifiers: { [key: string]: boolean },
    type: string,
    name: string,
    fieldRef: any,
  ): void;
  setRef?(el: FieldElement): void;
  format?(value: any, cursor?: number): any;
  unformat?(value: any): any;
  registerWrapped?: boolean;
  handleEnterKey?(event: FieldKeyboardEvent): void;
  [key: string]: any;
}

export interface WrappedComponentProps {
  onChange(event: GenericChangeEvent): void;
  onBlur(event: GenericFocusEvent): void;
  onFocus(event: GenericFocusEvent): void;
  onClick(event: GenericClickEvent): void;
  setRef: (element: any) => void;
  getValue: () => any;
  setValue: (value: any) => void;
  value: any;
  errors: (string | false)[];
  isValid: boolean;
}

export interface FieldProps {
  type: string;
  name: string;

  autoComplete?: string;
  checked?: boolean;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  required?: boolean;

  style?: React.CSSProperties;
  options?: any;

  // Provided by asField
  setRef: (instance: HTMLElement | HTMLInputElement | null) => any;
  value: any;
  onChange(event: GenericChangeEvent): void;
  onBlur(event: GenericFocusEvent): void;
  onFocus(event: GenericFocusEvent): void;
  onClick(event: GenericClickEvent): void;
  // setRef: (element: any) => void;
  getValue: () => any;
  setValue: (value: any) => void;
  errors: (string | false)[];
  isValid: boolean;

  // Allow others to come through
  [key: string]: any;
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
