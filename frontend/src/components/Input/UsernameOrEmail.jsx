import React from "react";
import Input from "./Input";

function UsernameOrEmail({ ...rest }) {
  return (
    <Input
      label="Username/email:"
      required
      name="usernameOrEmail"
      type="text"
      {...rest}
      pattern="([a-zA-Z0-9]{4,})|(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)"
    />
  );
}

export default UsernameOrEmail;
