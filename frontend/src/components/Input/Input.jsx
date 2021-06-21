import React from "react";

function Input({ label, ...rest }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...rest} />
    </div>
  );
}

export default Input;
