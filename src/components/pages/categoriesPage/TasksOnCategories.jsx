import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesTasks } from "../../../features/tasksSlice";
import TasksItems from "../../TasksItems";
import styles from "./Categories.module.css";
import { useState } from "react";
import LoadPreloader from "../../LoadPreloader";

const TasksOnCategories = () => {
  const { id } = useParams();
  const [counter, setCounter] = useState(0); 
  const [visible, setVisible] = useState(9);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 9);
    setCounter(counter + 1);
  };

  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const loading = useSelector((state) => state.tasksSlice.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesTasks(id));
  }, [dispatch, id]);

  
  return (
    <>
    {loading && <LoadPreloader />}
    <div className={styles.tasks}>
      {tasks.slice(0, visible).map((item) => (
        <TasksItems key={item._id} task={item} />
      ))}{" "}
      <button
        className={styles.btnShowMore}
        disabled={tasks.length === tasks.slice(0, visible).length ? true : null}
        onClick={showMoreItems}
      >
        Показать еще
      </button>
    </div>
    </>
  );
};

export default TasksOnCategories;
