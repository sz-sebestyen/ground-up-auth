import React from "react";
import Input from "./Input";

function Password({ ...rest }) {
  return (
    <Input
      label="Password:"
      required
      name="password"
      type="password"
      {...rest}
      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.-_]).{8,}"
    />
  );
}

export default Password;
