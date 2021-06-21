import React from "react";
import Input from "./Input";

function Username(props) {
  return (
    <Input
      label="Username:"
      required
      placeholder="username"
      name="username"
      {...props}
    />
  );
}

export default Username;
