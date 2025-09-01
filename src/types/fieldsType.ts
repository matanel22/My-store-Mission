export interface DateFieldProps {
  name: string;
  label?: string;
  validate?: any;
}
export interface InputHFProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
}

export interface SelectInputProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export interface TextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  validate?: any;
  rows?: number;
}
export interface InputHFProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  validate?: any;
  disabled?: boolean;
}
export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
