import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCategories } from "../../features/categoriesSlice";
import { addTasks, fetchTasks } from "../../features/tasksSlice";
import TasksItems from "../TasksItems";

const AddTaskModal = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const categories = useSelector((state) => state.categoriesSlice.categories);

  const addTask = () => {
    dispatch(addTasks({ title, text, price, category }));
    setCategory("");
    setTitle("");
    setText("");
    setPrice("");
  };

  const dispatch = useDispatch();
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
        <select>
          {categories.map((item) => {
            return (
              <option
                onChange={(e) => setCategory(e.target.value)}
                value={item._id}
                key={item._id}
              >
                {item.name}
              </option>
            );
          })}
        </select>
        <button onClick={addTask}>Добавить</button>
        {tasks.map((item) => {
          return <TasksItems key={item._id} task={item} />;
        })}
      </div>
    </div>
  );
};

export default AddTaskModal;
