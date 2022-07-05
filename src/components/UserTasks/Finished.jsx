import React from "react";
import { useSelector } from "react-redux";
import LoadPreloader from "../LoadPreloader";
import TasksItems from "../TasksItems";

const Finished = ({ finished }) => {
  const loading = useSelector((state) => state.tasksSlice.loading);

  return (
    <>
      {loading && <LoadPreloader />}
      {finished.map((task) => {
        return <TasksItems key={task._id} task={task} />;
      })}
    </>
  );
};

export default Finished;
