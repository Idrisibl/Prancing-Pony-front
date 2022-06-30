import { useDispatch, useSelector } from "react-redux";
import {
  getTaskById,
  patchTasks,
  removeTask,
} from "../../../features/tasksSlice";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Task.module.css";

const Task = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useSelector((state) => state.tasksSlice.currentTask);
  const authUser = useSelector((state) => state.auth.authUser);

  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    price: "",
  });

  const disabled = formData.title || formData.text || formData.price;

  const handleRemove = (id) => {
    dispatch(removeTask(id)).then(() => {
      navigate("/categories");
    });
  };

  const patchTask = () => {
    dispatch(patchTasks({ formData, id }));
    dispatch(getTaskById(id));
    setOpened(false);
  };

  useEffect(() => {
    dispatch(getTaskById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFormData({
      title: task.title,
      text: task.text,
      price: task.price,
    });
  }, [task.price, task.text, task.title]);

  if (!task.categories) {
    return "loading...";
  }

  return (
    <>
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
              <div>
                <div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    value={formData.title}
                    placeholder="Изменить заголовок..."
                  />
                </div>
                <div>
                  <textarea className={styles.inputText}
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                    value={formData.text}
                    placeholder="Изменить текст..."
                  />
                </div>
                <div>
                  <input
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    value={formData.price}
                    placeholder="Изменить вознаграждение..."
                  />
                </div>
                <div>
                  <button disabled={!disabled} onClick={patchTask}>
                    Добавить изменения
                  </button>
                </div>
              </div>
            )}
          </>
        }
      </div>
    </>
  );
};

export default Task;
