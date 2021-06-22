import React, { useState } from "react";
import { UsernameOrEmail, Password } from "../components/Input";
const jwt = require("jsonwebtoken");

function Login() {
  const [dto, setDto] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange = async ({ target, target: { name, value } }) => {
    setDto((dto) => ({ ...dto, [name]: value }));
    target.reportValidity();
  };

  const login = async ({ target }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });

      const json = await res.json();

      localStorage.setItem("jwt", json.jwt);
      console.log(jwt.decode(json.jwt));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form>
          <UsernameOrEmail
            value={dto.usernameOrEmail}
            onChange={handleInputChange}
          />
          <Password value={dto.password} onChange={handleInputChange} />
        </form>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
