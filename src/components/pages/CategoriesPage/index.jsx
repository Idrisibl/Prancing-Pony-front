import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Categories.module.css";
import { NavLink } from "react-router-dom";
import { fetchGetCategories } from "../../../features/categoriesSlice";
import { Outlet } from "react-router-dom";
import AddTaskModal from "../../AddTaskModal";
import { maxSort, minSort } from "../../../features/tasksSlice";
// import BreadCrumbs from "../../BreadСrumbs";

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoriesSlice.categories);

  const [opened, setOpened] = useState(false);

  const sortMax = () => {
    dispatch(maxSort());
  };

  const sortMin = () => {
    dispatch(minSort());
  };

  useEffect(() => {
    dispatch(fetchGetCategories());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.openBtnWrapper}>
        
        <span className={styles.openBtn} onClick={() => setOpened(true)}>
          Выложить задание
        </span>
        <div>
          Упорядочить по цене
          <button class="material-symbols-outlined" onClick={sortMax}>
            +
          </button>
          <button class="material-symbols-outlined" onClick={sortMin}>
            -
          </button>
        </div>
      </div>
      {opened && <AddTaskModal setOpened={setOpened} />}
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ul>
            <NavLink to={"/categories"}>
              <h2>Категории</h2>
            </NavLink>
            {categories.map((item) => (
              <li key={item._id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  to={`/categories/${item._id}`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default CategoriesPage;
