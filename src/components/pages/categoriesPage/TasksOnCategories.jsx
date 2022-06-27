import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesTasks } from "../../../features/tasksSlice";
import TasksItems from "../../TasksItems";
import styles from './Categories.module.css'

const TasksOnCategories = () => {
  const { id } = useParams();

  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesTasks(id));
  }, [dispatch, id]);

  return (
    <div className={styles.tasks}>
      {tasks.map((item) => {
        return <TasksItems key={item._id} task={item} />;
      })} 
    </div>
  );
};

export default TasksOnCategories;
