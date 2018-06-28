export type StrFalseArr = (string | false)[];

export type FieldElement = HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement & HTMLElement;

export type FieldKeyboardEvent = React.SyntheticEvent<React.KeyboardEvent<FieldElement>>;

export type GenericFocusEvent = React.SyntheticEvent<
  React.FocusEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
>;

export type GenericClickEvent = React.SyntheticEvent<React.MouseEvent<HTMLElement>>;

export interface FieldProps {
  type: string;
  name: string;
  value: any;
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  errors: (string | false)[];
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;

  style?: React.CSSProperties;
  options?: any;
  getValue(): any;
  setValue(value: any): void;
  setRef(element: HTMLElement): void;
  isValid: boolean;
  onInput?(): any;
  onChange?(): any;
  onFocus?(): any;
  onBlur?(): any;
}

export interface FieldInterface {
  name: string;
  getRef(): HTMLElement;
  getValue(): any;
  setValue(value: any): void;
  validate(): StrFalseArr;
  isValid(): boolean;
  reset(): void;
}
