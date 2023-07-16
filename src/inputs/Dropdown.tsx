import React, { useState } from "react";
import ValidateAt from "../enums/ValidateAt";
import InputWithValidation from "./InputWithValidation";
import Select, { GroupBase } from "react-select";

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
  isClearable?: boolean;
  options: (string | GroupBase<string>)[];
  isMulti?: boolean;
  setFormData?: (callback: (arg: any) => any) => any;
  optionLabel?: string;
  optionValue?: string;
}

const randomId = String(Math.random() * 999999999);

const styles = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    // borderColor: state.isFocused ? "yellow" : "red",
    border: "none !important",
    boxShadow: "0px !important",
  }),
  input: (baseStyles: any) => ({ ...baseStyles }),
  indicatorSeparator: (baseStyles: any) => ({
    ...baseStyles,
    display: "none",
  }),
};

const DropDown: React.FC<Props> = ({
  onChange,
  type,
  disabled,
  placeholder,
  autoFocus,
  isClearable,
  options,
  isMulti,
  setFormData,
  optionLabel = "name",
  optionValue = "value",
  ...props
}) => {
  const handleChange = (option: any) => {
    if (!setFormData) return;

    setFormData((prev) => {
      return { ...prev, [props.name]: option?.[optionValue] };
    });
  };

  return (
    <InputWithValidation inputId={randomId} {...props}>
      <Select
        id={randomId}
        name={props.name}
        value={options?.find(
          (option: any) => option?.[optionValue] === props?.value
        )}
        onChange={onChange ? onChange : handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        isDisabled={disabled}
        isClearable={isClearable}
        options={options}
        isMulti={isMulti}
        styles={styles}
        getOptionLabel={(option: any) => option?.[optionLabel]}
        getOptionValue={(option: any) => option?.[optionValue]}
      />
    </InputWithValidation>
  );
};

export default DropDown;
