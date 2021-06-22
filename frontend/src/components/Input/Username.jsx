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
      pattern="[a-zA-Z0-9]{4,}"
    />
  );
}

export default Username;
