import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCategories } from "../../features/categoriesSlice";
import { addTasks, fetchTasks } from "../../features/tasksSlice";
import styles from "./Modal.module.css";
import { GiCheckMark } from "react-icons/gi";
import { deductFromWallet } from "../../features/authSlice";

const AddTaskModal = ({ setOpened }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategory] = useState("");

  const dispatch = useDispatch();

  const AllCategories = useSelector(
    (state) => state.categoriesSlice.categories
  );

  const addTask = () => {
    dispatch(addTasks({ title, text, price, categories }));
    dispatch(deductFromWallet({price}));
    setCategory("");
    setTitle("");
    setText("");
    setPrice("");
    setOpened(false);
  };

  useEffect(() => {
    dispatch(fetchGetCategories());
    dispatch(fetchTasks());
  }, [dispatch]);

  const disabled = title && text && price && categories;

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <button onClick={() => setOpened(false)}>X</button>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Добавить заголовок..."
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Добавить текст..."
            />
          </div>
          <div>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Добавить вознаграждение..."
            />
          </div>
          <div>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled selected>
                Выберите категорию
              </option>
              {AllCategories.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.addBtn}>
            <button disabled={!disabled} onClick={addTask}>
              <GiCheckMark size="3rem" fill={!disabled ? "gray" : "green"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
