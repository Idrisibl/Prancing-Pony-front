import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const id = useSelector((state) => state.auth.user._id);

  const exitFromAccaunt = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <ul className={styles.sidebar}>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to={`/profile/${id}`}
        >
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to={`/profile/${id}/tasks`}
        >
          Задания
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to={`/profile/${id}/friends`}
        >
          Друзья
        </NavLink>
      </li>
      <li onClick={exitFromAccaunt}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/categories"
        >
          Выйти
        </NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;
