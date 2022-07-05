import styles from "./Tasks.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  sendConfirmation,
} from "../../features/authSlice";
import {
  GiArrowScope,
  GiBottomRight3DArrow,
  GiBroadheadArrow,
  GiWingedArrow,
} from "react-icons/gi";
import { BsFillBookmarkStarFill, BsFillBookmarkXFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";

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
      <div className={styles.task}>
        <div className={styles.bookmark}>
          {!favourite ? (
            <BsFillBookmarkStarFill
              onClick={handleAddFavourites}
              size="3.5rem"
              fill="darkRed"
            />
          ) : (
            <BsFillBookmarkXFill
              size="3.5rem"
              fill="darkRed"
              onClick={handleRemoveFavourite}
            />
          )}
        </div>
        <h4>{task.title}</h4>
        <div className={styles.desk}>{task.text}</div>
        <div>
          <div className={styles.price}>
            <span>{task.price}</span>
            <FaCoins
              style={{ marginLeft: "10px" }}
              size="1.5rem"
              fill="yellow"
            />
          </div>
          <div>{task.completed}</div>
          <div className={styles.transition}>
            <NavLink className={styles.arrow} to={`/tasks/${task._id}`}>
              <GiWingedArrow size="3.5rem" fill="darkRed" />
            </NavLink>
          </div>

          {visible && (
            <button onClick={handleChangeConfirmation}>Выполнено</button>
          )}
        </div>
      </div>
    </>
  );
};

export default TasksItems;
