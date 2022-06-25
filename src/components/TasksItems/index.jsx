import styles from "./Tasks.module.css";
import React from "react";

const TasksItems = ({ task }) => {
  return (
    <>
      <div>
          <h4>{task.title}</h4>
          <div>{task.text}</div>
          <div>{task.price}$</div>
          <div>{task.completed}</div>
      </div>
        
    </>
  );
};

export default TasksItems;
