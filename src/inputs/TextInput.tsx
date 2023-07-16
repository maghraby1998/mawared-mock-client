import React from "react";
import ValidateAt from "../enums/ValidateAt";
import InputWithValidation from "./InputWithValidation";

interface Props {
  name: string;
  value: string;
  onChange?: (e: any) => void;
  label?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  validateAt?: ValidateAt;
  isFormSubmitted?: boolean;
  setClientErrors?: (callback: (arg: any) => any) => any;
  containerStyle?: string;
  autoFocus?: boolean;
  setFormData?: (callback: (arg: any) => any) => any;
}

const randomId = String(Math.random() * 999999999);

const TextInput: React.FC<Props> = ({
  onChange,
  type,
  disabled,
  placeholder,
  autoFocus,
  setFormData,
  ...props
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (!setFormData) return;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <InputWithValidation inputId={randomId} {...props}>
      <input
        id={randomId}
        className="py-2 w-full outline-none"
        name={props.name}
        type={type}
        value={props.value}
        onChange={onChange ? onChange : handleInputChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
      />
    </InputWithValidation>
  );
};

export default TextInput;
