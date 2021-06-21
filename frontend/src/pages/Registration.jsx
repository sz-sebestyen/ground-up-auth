import React, { useState } from "react";
import { Username, Email, Password } from "../components/Input";

function Registration() {
  const [dto, setDto] = useState({ username: "", email: "", password: "" });

  const handleInputChange = async ({ target: { name, value } }) => {
    setDto((dto) => ({ ...dto, [name]: value }));
  };

  const register = async () => {
    console.log(dto);
  };

  return (
    <div>
      <div>
        <Username value={dto.username} onChange={handleInputChange} />
        <Email value={dto.email} onChange={handleInputChange} />
        <Password value={dto.password} onChange={handleInputChange} />
        <div>
          <button onClick={register}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
