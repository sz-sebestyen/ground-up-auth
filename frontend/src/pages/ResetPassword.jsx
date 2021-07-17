import React, { useState } from "react";
import { useHistory } from "react-router";
import useQuery from "../hooks/useQuery";
import { Password } from "../components/Input";
import Navigation from "../components/Navigation";

function ResetPassword() {
  const query = useQuery();
  const history = useHistory();

  const code = query.get("code");
  const username = query.get("user");

  const [dto, setDto] = useState({
    password: "",
    password2: "",
    code,
    username,
  });

  const handleInputChange = async ({ target, target: { name, value } }) => {
    setDto((prevDto) => ({ ...prevDto, [name]: value }));

    if (name === "password2") {
      if (value !== dto.password) {
        target.setCustomValidity("Please reapeat your password!");
      } else {
        target.setCustomValidity("");
      }
    }
    target.reportValidity();
  };

  const reset = async ({ target }) => {
    if (dto.password !== dto.password2) {
      target.parentElement
        .querySelector('input[name="password2"]')
        .setCustomValidity("Reapeat password!");
    } else {
      target.parentElement
        .querySelector('input[name="password2"]')
        .setCustomValidity("");
    }
    const isValid = target.parentElement.querySelector("form").reportValidity();
    console.log(dto, isValid);

    if (isValid) {
      try {
        const res = await fetch("/api/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        });

        const json = await res.json();
        console.log("password reset answer: ", json);

        if (json.status === "success") {
          history.push("/login", { message: "Password changed!" });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Navigation />
      <h1>Reset password</h1>

      <div>
        <form>
          <Password value={dto.password} onChange={handleInputChange} />
          <Password
            value={dto.password2}
            onChange={handleInputChange}
            name="password2"
          />
        </form>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default ResetPassword;
