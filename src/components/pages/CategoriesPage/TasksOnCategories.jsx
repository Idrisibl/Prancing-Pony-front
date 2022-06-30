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

  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const loading = useSelector((state) => state.tasksSlice.loading);
  const dispatch = useDispatch();

  const filteredTasks = tasks.slice(0, visible).filter((task) => {
    return task.title.toLowerCase().includes(value.toLowerCase());
  });

  useEffect(() => {
    dispatch(fetchCategoriesTasks(id));
  }, [dispatch, id]);

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

export default TasksOnCategories;
