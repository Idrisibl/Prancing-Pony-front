import React from "react";
import TasksItems from "../TasksItems";

const Bag = ({ bag }) => {
  return (
    <>
      {bag?.map((task) => {
        return <TasksItems key={task._id} task={task} />;
      })}
    </>
  );
};

export default Bag;
