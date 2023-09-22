import React, { useState } from "react";
import Home from "../../pages/Home";

function NewsList() {
  const [data, setData] = useState([
    { id: 1, username: "B", action: "delete" },
    { id: 2, username: "A", action: "delete" },
    { id: 3, username: "V", action: "delete" },
  ]);

  return (
    <div>
      <Home data={data} />
    </div>
  );
}

export default NewsList;
