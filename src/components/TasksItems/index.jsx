import styles from "./Tasks.module.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

const TasksItems = ({ task }) => {
  const dispatch = useDispatch()

  const handleChangeCompleted = () => {
    
  }
  
  return (
    <>
      <div className={styles.task}>
        <h4>{task.title}</h4>
        <div className={styles.desk}>{task.text}</div>
        <div>{task.price}$</div>
        <div>{task.completed}</div>
        <NavLink to={`/tasks/${task._id}`}><button>Перейти к заданию</button></NavLink>
        <button onClick={handleChangeCompleted}>Выполнено</button>
      </div>
    </>
  );
};

export default TasksItems;