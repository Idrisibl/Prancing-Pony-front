import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../features/tasksSlice";
import LoadPreloader from "../../LoadPreloader";
import TasksItems from "../../TasksItems";
import styles from "./Categories.module.css";
import { useState } from "react";


const AllTasks = () => {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(9);


  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 9);
    setCounter(counter + 1);
  };

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const loading = useSelector((state) => state.tasksSlice.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!tasks.length) {
    return <div>Нет больше тасков</div>;
  }

  return (
    <>
      {loading && <LoadPreloader />}
      <div className={styles.tasks}>
        {tasks.slice(0, visible).map((item) => (
          <TasksItems key={item._id} task={item} />
        ))}{" "}
        <button
          className={styles.btnShowMore}
          disabled={
            tasks.length === tasks.slice(0, visible).length ? true : null
          }
          onClick={showMoreItems}
        >
          Показать еще
        </button>
      </div>
    </>
  );
};

export default AllTasks;