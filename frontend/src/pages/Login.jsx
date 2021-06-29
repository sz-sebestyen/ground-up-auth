import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { UsernameOrEmail, Password } from "../components/Input";
import Navigation from "../components/Navigation";
import jwt from "jsonwebtoken";

function Login() {
  const { state } = useLocation();
  const history = useHistory();

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

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
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
        <Link to="/forgot-password">I forgot my password</Link>
        {state?.message}
      </div>
    </div>
  );
}

export default Login;
