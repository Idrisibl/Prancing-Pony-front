import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCategories } from "../../features/categoriesSlice";
import { addTasks, fetchTasks } from "../../features/tasksSlice";


const AddTaskModal = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategory] = useState("");

  const dispatch = useDispatch();

  const AllCategories = useSelector((state) => state.categoriesSlice.categories);

  const addTask = () => {
    dispatch(addTasks({ title, text, price, categories }));
    setCategory("");
    setTitle("");
    setText("");
    setPrice("");
  };

  useEffect(() => {
    dispatch(fetchGetCategories());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
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
          {AllCategories.map((item) => {
            return (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <button onClick={addTask}>Добавить</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
