import React from "react";
import Input from "./Input";

function Email(props) {
  return (
    <Input
      label="Email:"
      required
      placeholder="email"
      type="email"
      name="email"
      {...props}
      pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
    />
  );
}

export default Email;
