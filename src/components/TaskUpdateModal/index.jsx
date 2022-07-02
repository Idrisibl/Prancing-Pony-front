import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deductFromWallet } from "../../features/authSlice";
import { getTaskById, patchTasks } from "../../features/tasksSlice";
import styles from "../AddTaskModal/Modal.module.css";

const TaskUpdateModal = ({ task, setOpened, id }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    price: "",
  });
  const dispatch = useDispatch();

  const patchTask = () => {
    dispatch(patchTasks({ formData, id }));
    dispatch(getTaskById(id));
    dispatch(deductFromWallet({ price: formData.price }));
    setOpened(false);
  };

  useEffect(() => {
    setFormData({
      title: task.title,
      text: task.text,
      price: task.price,
    });
  }, [task.price, task.text, task.title]);

  const disabled = formData.title || formData.text || formData.price;

  if (!task.categories) {
    return "loading...";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <button onClick={() => setOpened(false)}>X</button>
          </div>
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
              <textarea
                className={styles.inputText}
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
        </div>
      </div>
    </div>
  );
};

export default TaskUpdateModal;
