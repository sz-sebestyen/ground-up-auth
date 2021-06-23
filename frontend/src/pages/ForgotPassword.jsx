import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Email } from "../components/Input";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleInputChange = async ({ target, target: { value } }) => {
    setEmail(value);
    target.reportValidity();
    setIsSent(false);
  };

  const send = async () => {
    setIsSent(true);

    try {
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      console.log("reset response", json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <h1>Recover your password</h1>
      <Email value={email} onChange={handleInputChange} />
      <button onClick={send} disabled={isSent}>
        {isSent ? "Email sent" : "Send email"}
      </button>
    </div>
  );
}

export default ForgotPassword;
