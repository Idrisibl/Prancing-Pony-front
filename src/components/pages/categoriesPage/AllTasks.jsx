import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../features/tasksSlice";
import TasksItems from "../../TasksItems";


const AllTasks = () => {
  
const dispatch = useDispatch()
const tasks = useSelector((state) => state.tasksSlice.tasks)

useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);

  return (
    <>
      {tasks.map((item) => {
          return <TasksItems key={item._id} task={item} />;
        })}
    </>
  );
};

export default AllTasks;