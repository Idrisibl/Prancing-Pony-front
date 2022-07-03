import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { confirm } from "../../features/authSlice";
import {
  clearResponses,
  fetchResponses,
  sendResponse,
} from "../../features/responseSlice";
import { changeAviability, getTaskById } from "../../features/tasksSlice";
import LoadPreloader from "../LoadPreloader";
import styles from "./Response.module.css";

const Response = ({ task }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.responseReducer.loading);
  const authUser = useSelector((state) => state.auth.authUser);
  const responses = useSelector((state) => state.responseReducer.responses);

  const user = responses.find((response) => response.user._id === authUser._id);

  useEffect(() => {
    dispatch(fetchResponses({ id: task._id }));
  }, [dispatch, task]);

  if (loading) {
    return <LoadPreloader />;
  }

  const handleTake = (e) => {
    e.preventDefault();
    dispatch(sendResponse({ text, task: task._id }));
    dispatch(getTaskById(task._id));
    setText("");
  };

  const handleConfirm = (id) => {
    dispatch(confirm({ id, taskId: task._id }));
    dispatch(clearResponses({ taskId: task._id }));
    dispatch(changeAviability({ taskId: task._id }));
  };

  return (
    <>
      {task.user._id !== authUser._id && (
        <>
          <h2>Отправить отклик:</h2>
          <form onSubmit={(e) => handleTake(e)}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button disabled={user}>Отправить</button>
          </form>
        </>
      )}
      <div>
        <h2>Отклики:</h2>
        {loading && <LoadPreloader />}
        {responses.map((response) => {
          return (
            <div key={response._id}>
              <div className={styles.header}>
                <div className={styles.image}>
                  <Link to={`/profile/${response.user._id}`}>
                    <img
                      src={`http://localhost:3042/${response.user.avatar}`}
                      alt="avatar"
                    />
                  </Link>
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
              {!user && (
                <button onClick={() => handleConfirm(response.user._id)}>
                  Принять
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Response;
