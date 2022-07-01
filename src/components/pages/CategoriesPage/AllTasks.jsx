import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../features/tasksSlice";
import LoadPreloader from "../../LoadPreloader";
import TasksItems from "../../TasksItems";
import styles from "./Categories.module.css";
import { useState } from "react";

const AllTasks = () => {
  const [visible, setVisible] = useState(9);
  const [value, setValue] = useState("");

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 9);
  };

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const loading = useSelector((state) => state.tasksSlice.loading);

  const filteredTasks = tasks.slice(0, visible).filter((task) => {
    return task.title.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!tasks.length) {
    return <div>Нет больше тасков</div>;
  }

  return (
    <>
      {loading && <LoadPreloader />}
      <div>
        <input type="text" onChange={(event) => setValue(event.target.value)} />
      </div>
      <div className={styles.tasks}>
        {filteredTasks.map((item) => (
          <TasksItems key={item._id} task={item} />
        ))}{" "}
        <button
          // className={styles.btnShowMore}
          className={
            tasks.length === tasks.slice(0, visible).length ||
            value.length !== 0
              ? styles.btnShowMoreOff
              : styles.btnShowMore
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
