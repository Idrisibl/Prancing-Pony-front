import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthUser, sendResponse } from "../../features/authSlice";
import { getTaskById } from "../../features/tasksSlice";
import styles from "./Response.module.css";

const Response = ({ task }) => {
  const [text, setText] = useState();
  const dispatch = useDispatch();

  const handleTake = (e) => {
    e.preventDefault();
    dispatch(sendResponse({ id: task.user._id, text }));
    dispatch(getTaskById(task._id));
    setText("");
  };

  return (
    <>
      <h2>Отправить отклик:</h2>
      <form onSubmit={(e) => handleTake(e)}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Отправить</button>
      </form>
      <div>
        {task.user.responses?.map((response) => {
          return (
            <div key={response._id}>
              <div className={styles.header}>
                <div className={styles.image}>
                  <img
                    src={`http://localhost:3042/${response.user.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div>
                  <div>
                    <span>{response.user.name} </span>
                    <span>{response.user.lastname}</span>
                  </div>
                  <div>
                    <span>Очки: {response.user.rating} </span>
                    <span>Ранг: {response.user.rating} </span>
                  </div>
                </div>
              </div>
              <div>{response.text}</div>
              <button>Принять</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Response;
