import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/pony.png";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="" />
        </Link>
        <ul className={styles.list}>
          <li>
            <Link to="/categories">Задания</Link>
          </li>
          <li>
            <Link to="/users">Пользователи</Link>
          </li>
          <li>
            <Link to="/communities">Сообщества</Link>
          </li>
          <li>
            <Link to="/chat">Чат</Link>
          </li>
        </ul>
        <div className={styles.profile}>
          <span>
            <Link to="/signin">
              <strong>Авторизируйтесь, </strong>
            </Link>
            и перед вами будет еще больше возможностей!
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
