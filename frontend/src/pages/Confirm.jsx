import React, { useState, useEffect } from "react";
import useQuery from "../hooks/useQuery";
import Navigation from "../components/Navigation";

function Confirm() {
  const query = useQuery();

  const code = query.get("code");
  const username = query.get("user");

  const [isLoading, setIsLoading] = useState(true);

  const confirm = async () => {
    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, username }),
      });

      const json = await res.json();
      console.log("confirmation answer: ", json);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    confirm();
  }, []);

  return (
    <div>
      <Navigation />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>Thank you {username} for confirming your email address.</div>
      )}
    </div>
  );
}

export default Confirm;
