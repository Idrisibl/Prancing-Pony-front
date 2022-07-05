import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../features/tasksSlice";
import LoadPreloader from "../../LoadPreloader";
import TasksItems from "../../TasksItems";
import styles from "./Categories.module.css";
import { useState } from "react";
import { deductFromWallet } from "../../../features/authSlice";
import Sort from "../../SortPrice/SortPrice";

const AllTasks = () => {
  const [visible, setVisible] = useState(9);
  const [value, setValue] = useState("");

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 9);
  };

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const loading = useSelector((state) => state.tasksSlice.loading);

  let filteredTasks = tasks.filter((task) => {
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
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <input
            placeholder="Поиск заданий..."
            type="text"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <Sort />

        {value ? (
          <div className={styles.tasks}>
            {filteredTasks.map((item) => (
              <TasksItems key={item._id} task={item} />
            ))}{" "}
            <button
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
        ) : (
          <div className={styles.tasks}>
            {tasks.slice(0, visible).map((item) => (
              <TasksItems key={item._id} task={item} />
            ))}{" "}
            <div className={styles.btnWrapper}>
              <button
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
          </div>
        )}
      </div>
    </>
  );
};

export default AllTasks;
