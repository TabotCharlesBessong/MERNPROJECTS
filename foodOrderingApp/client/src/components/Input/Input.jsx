import React from "react";
import classes from "./input.module.css";
import { InputContainer } from "../index";

const Input = (
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref
) => {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    switch (error.type) {
      case "required":
        return "This field is required";
      case "minLenght":
        return "This field is too short";
      default:
        return "*";
    }
  };
  return (
    <InputContainer>
      <input
        type={type}
        defaultValue={defaultValue}
        className={classes.input}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
};

export default React.forwardRef(Input);
