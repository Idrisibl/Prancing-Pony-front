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
    dispatch(fetchCategoriesTasks(id));
  }, [dispatch, id]);
  if (!tasks.length) {
    return <div>Нет больше тасков</div>;
  }

  return (
    <div className={styles.wrapper}>
      {loading && <LoadPreloader />}
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Поиск заданий"
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
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
  );
};

export default TasksOnCategories;
