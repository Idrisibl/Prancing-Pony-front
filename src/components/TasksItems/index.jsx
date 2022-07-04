import styles from "./Tasks.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  sendConfirmation,
} from "../../features/authSlice";

const TasksItems = ({ task, favourites }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.id);

  const handleChangeConfirmation = () => {
    dispatch(sendConfirmation({ id: task.user, task: task._id }));
  };

  const favourite = favourites?.find((item) => item._id === task._id);

  const visible = !task.left && !task.completed && !task.failed;

  const handleAddFavourites = () => {
    if (task.user._id !== id) {
      dispatch(addToFavourites({ taskId: task._id }));
    }
  };

  const handleRemoveFavourite = () => {
    dispatch(removeFromFavourites({ taskId: task._id }));
  };

  return (
    <>
      {!favourite ? (
        <button onClick={handleAddFavourites}>добавить в избранное</button>
      ) : (
        <button onClick={handleRemoveFavourite}>удалить</button>
      )}
      <div className={styles.task}>
        <h4>{task.title}</h4>
        <div className={styles.desk}>{task.text}</div>
        <div>{task.price}$</div>
        <div>{task.completed}</div>
        <NavLink to={`/tasks/${task._id}`}>
          <button>Перейти к заданию</button>
        </NavLink>

        {visible && (
          <button onClick={handleChangeConfirmation}>Выполнено</button>
        )}
      </div>
    </>
  );
};

export default TasksItems;
