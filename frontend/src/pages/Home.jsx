import React from "react";

function Home() {
  const getMessage = async (type) => {
    try {
      const res = await fetch(`/api/${type}`);
      const json = await res.json();
      console.log(json);
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
    </div>
  );
}

export default Home;
