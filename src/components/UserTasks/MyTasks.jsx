import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksForUser } from "../../features/tasksSlice";
import LoadPreloader from "../LoadPreloader";
import TasksItems from "../TasksItems";

const MyTasks = ({ id }) => {
  const loading = useSelector((state) => state.tasksSlice.loading);
  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksForUser(id));
  }, [dispatch, id]);

  return (
    <>
      {loading && <LoadPreloader />}
      {tasks.map((task) => {
        return <TasksItems key={task._id} task={task} />;
      })}
    </>
  );
};

export default MyTasks;
