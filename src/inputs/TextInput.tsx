import React from "react";
import useValidation from "../hooks/useValidation";
import ValidateAt from "../enums/ValidateAt";

interface Props {
  name: string;
  value: string;
  onChange: (e: any) => void;
  label?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  validateAt?: ValidateAt;
  isFormSubmitted?: boolean;
  setClientErrors?: (callback: (arg: any) => any) => any;
}

const randomId = String(Math.random() * 999999999);

const TextInput: React.FC<Props> = ({
  validateAt,
  isFormSubmitted = false,
  setClientErrors = () => {},
  label,
  ...inputProps
}) => {
  const { isValid, validationMessage } = useValidation({
    name: inputProps.name,
    value: inputProps.value,
    validateAt,
    isFormSubmitted,
    setClientErrors,
  });

  return (
    <div>
      <div>
        {label?.length ? (
          <label
            className={`capitalize text-slate-500 font-semibold ${
              !isValid && isFormSubmitted ? "text-red-400" : ""
            }`}
            htmlFor={randomId}
          >
            {label}
          </label>
        ) : null}
        <input
          id={randomId}
          className={`border-b py-2 w-full mb-2 outline-none focus:border-b-2 ${
            !isValid && isFormSubmitted
              ? "invalid-input-style"
              : "border-b-slate-500"
          }`}
          autoComplete="new-password"
          {...inputProps}
        />
      </div>
      {isFormSubmitted ? (
        <p className="error-validation-message">{validationMessage}</p>
      ) : null}
    </div>
  );
};

export default TextInput;
