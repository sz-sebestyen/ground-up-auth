import React from "react";
import Input from "./Input";

function Password(props) {
  return (
    <Input
      label="Password:"
      required
      name="password"
      type="password"
      {...props}
    />
  );
}

export default Password;
