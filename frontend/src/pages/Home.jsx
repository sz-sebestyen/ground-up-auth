import React, { useState } from "react";

function Home() {
  const [dto, setDto] = useState();

  const getMessage = async (type) => {
    try {
      const res = await fetch(`/api/${type}`);
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
