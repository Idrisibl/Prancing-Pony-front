import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const id = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const exitFromAccaunt = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    window.location.reload().then(() => {
      navigate("/categorires");
    });
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
          to="/profile/friends"
        >
          Друзья
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/profile/blacklist"
        >
          Черный список
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/profile/finished"
        >
          Завершённые
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to="/profile/failed"
        >
          Проваленные
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
