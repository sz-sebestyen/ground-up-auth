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
    />
  );
}

export default Email;
