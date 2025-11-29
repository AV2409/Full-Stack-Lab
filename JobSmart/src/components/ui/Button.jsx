import React from "react";

const Button = ({ children, onClick, variant = "primary", type = "button", style, disabled }) => (
  <button 
    type={type} 
    className={`btn btn-${variant}`} 
    onClick={onClick}
    style={style}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
