import React from "react";
import "../AddTask/addtask.css";

function AddTask(a) {
  console.log(a.data);

  return (
    <>
      <p>{a.data}</p>
    </>
  );
}

export default AddTask;
