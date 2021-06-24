import React, { useState } from "react";
import Navigation from "../components/Navigation";

function Home() {
  const [dto, setDto] = useState();

  const getMessage = async (type) => {
    try {
      const res = await fetch(`/api/${type}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const json = await res.json();
      console.log(json);
      setDto(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrivate = () => getMessage("private");
  const getPublic = () => getMessage("public");

  return (
    <div>
      <Navigation />
      <h1>Home</h1>
      <button onClick={getPublic}>Public</button>
      <button onClick={getPrivate}>Private</button>
      {dto && (
        <div>
          <div>Response:</div>
          <div>{dto.message}</div>
        </div>
      )}
    </div>
  );
}

export default Home;
