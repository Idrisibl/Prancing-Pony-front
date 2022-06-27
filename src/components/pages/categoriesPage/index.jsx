import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Categories.module.css";
import { NavLink } from "react-router-dom";
import { fetchGetCategories } from "../../../features/categoriesSlice";
import { Outlet } from "react-router-dom";
import AddTaskModal from "../../AddTaskModal";
// import BreadCrumbs from "../../BreadСrumbs";

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoriesSlice.categories);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchGetCategories());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.openBtnWrapper}>
        <span className={styles.openBtn} onClick={() => setOpened(true)}>
          Выложить задание
        </span>
      </div>
      {opened && <AddTaskModal setOpened={setOpened} />}
      <div className={styles.content}>
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

        <Outlet />
      </div>
    </div>
  );
};

export default CategoriesPage;
