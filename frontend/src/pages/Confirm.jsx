import React, { useState } from "react";
import useQuery from "../hooks/useQuery";

function Confirm() {
  const query = useQuery();

  const code = query.get("code");
  const username = query.get("user");

  return (
    <div>
      <div>{username}</div>
      <div>{code}</div>
    </div>
  );
}

export default Confirm;
