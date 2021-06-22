import React, { useState } from "react";
import { Username, Email, Password } from "../components/Input";

function Registration() {
  const [dto, setDto] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const checkUnique = async (path, dto) => {
    try {
      const res = await fetch(`/api/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });

      const json = await res.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = async ({ target, target: { name, value } }) => {
    setDto((dto) => ({ ...dto, [name]: value }));

    if (name === "password2") {
      if (value !== dto.password) {
        target.setCustomValidity("Must reapeat password!");
        target.reportValidity();
      } else {
        target.setCustomValidity("");
      }
    }

    if (name === "username" || name === "email") {
      const answer = await checkUnique(name, { [name]: value });

      if (!answer.isUnique) {
        target.setCustomValidity(answer.message);
        target.reportValidity();
      } else {
        target.setCustomValidity("");
      }
    }
  };

  const register = async ({ target }) => {
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
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        });

        const json = await res.json();
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <div>
        <form>
          <Username value={dto.username} onChange={handleInputChange} />
          <Email value={dto.email} onChange={handleInputChange} />
          <Password value={dto.password} onChange={handleInputChange} />
          <Password
            value={dto.password2}
            onChange={handleInputChange}
            name="password2"
          />
        </form>
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Registration;
