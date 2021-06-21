import React, { useState } from "react";
import { Username, Email, Password } from "../components/Input";

function Registration() {
  const [dto, setDto] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleInputChange = async ({ target: { name, value } }) => {
    setDto((dto) => ({ ...dto, [name]: value }));
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
  };

  return (
    <div>
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
