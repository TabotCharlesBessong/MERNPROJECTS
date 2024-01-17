import React from "react";
import classes from "./button.module.css";

const Button = ({
  type,
  text,
  onClick,
  color,
  backgroundColor,
  fontSize,
  width,
  height,
}) => {
  return (
    <div className={classes.container} >
      <button
        style={{
          color,
          backgroundColor,
          fontSize,
          width,
          height,
        }}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

Button.defaultProps = {
  type: "button",
  text: "Submit",
  backgroundColor: "#e72929",
  color: "white",
  fontSize: "1.3rem",
  width: "12rem",
  height: "3.5rem",
};
