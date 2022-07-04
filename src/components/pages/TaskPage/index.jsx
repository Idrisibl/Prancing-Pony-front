import { useDispatch, useSelector } from "react-redux";
import { getTaskById, removeTask } from "../../../features/tasksSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Task.module.css";
import Response from "../../Response";
import TaskUpdateModal from "../../TaskUpdateModal";
import LoadPreloader from "../../LoadPreloader";

const Task = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useSelector((state) => state.tasksSlice.currentTask);
  const loading = useSelector((state) => state.tasksSlice.loading);
  const authUser = useSelector((state) => state.auth.authUser);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(getTaskById(id));
  }, [dispatch, id]);


  const handleRemove = (id) => {
    dispatch(removeTask(id)).then(() => {
      navigate("/categories");
    });
  };

  if (!task.categories) {
    return "loading...";
  }

  return (
    <>
      {loading && <LoadPreloader />}
      <div className={styles.content}>
        <NavLink to="/categories">Перейти ко всем заданиям</NavLink>
        {
          <>
            <div>{task.title}</div>
            <div>{task.text}</div>
            <div>{task.price}$</div>
            <div>{task.user.name}</div>
            <div>{task.user.lastname}</div>
            <div>{task.categories.name}</div>
            {authUser._id === task.user._id && (
              <>
                <button onClick={() => handleRemove(task._id)}>Удалить</button>
                <button onClick={() => setOpened(true)}>Изменить</button>
              </>
            )}
            {opened && (
              <TaskUpdateModal task={task} setOpened={setOpened} id={id} />
            )}
          </>
        }
        <Response task={task} />
      </div>
    </>
  );
};

export default Task;
