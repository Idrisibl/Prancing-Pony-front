import { useDispatch, useSelector } from "react-redux";
import { getTaskById, removeTask } from "../../../features/tasksSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Task.module.css";
import Response from "../../Response";
import TaskUpdateModal from "../../TaskUpdateModal";
import LoadPreloader from "../../LoadPreloader";
import { FaCoins } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

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
        <NavLink className={styles.back} to="/categories">
          Перейти ко всем заданиям
        </NavLink>
        {
          <>
            <h1 className={styles.title}>{task.title}</h1>
            <div className={styles.category}>
              <strong>Категория: </strong>
              <span>{task.categories.name}</span>
            </div>
            <div className={styles.desc}>
              <h2>Описание:</h2>
              <div>
                <p>{task.text}</p>
              </div>
            </div>
            <div className={styles.price}>
              <strong>Награда: </strong>
              <span>{task.price}</span>
              <FaCoins size="1.5rem" fill="yellow" />
            </div>
            <div className={styles.name}>
              <strong>Заказчик: </strong>
              <span>{task.user.name} </span>
              <span>{task.user.lastname}</span>
            </div>
            {authUser._id === task.user._id && (
              <div className={styles.btn}>
                <RiDeleteBin2Fill
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  fill="red"
                  size="3rem"
                  onClick={() => handleRemove(task._id)}
                />
                <BiEdit
                  style={{ cursor: "pointer" }}
                  fill="green"
                  size="3rem"
                  onClick={() => setOpened(true)}
                />
              </div>
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
