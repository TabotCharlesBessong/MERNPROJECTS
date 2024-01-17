import React from "react";
import classes from "./inputContainer.module.css";

const InputContainer = ({ label, bgColor, children }) => {
  return (
    <div className={classes.container} style={{ backgroundColor: bgColor }}>
      <label className={classes.label}>{label}</label>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default InputContainer;
