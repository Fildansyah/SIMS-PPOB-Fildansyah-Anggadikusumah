import React from "react";

const Button = ({ children, disabled, className, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`${className} ${disabled && "bg-gray-300"}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
