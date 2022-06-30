import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/pony.png";
import { GiSwapBag } from "react-icons/gi";
import styles from "./Header.module.css";
import { fetchAuthUser } from "../../../features/authSlice";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const user = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

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
          {!token ? (
            <span>
              <Link to="/signin">
                <strong>Авторизируйтесь, </strong>
              </Link>
              и перед вами будет еще больше возможностей!
            </span>
          ) : (
            <div className={styles.profileBar}>
              <div className={styles.wallet}>
                <GiSwapBag size="3rem" fill="#4D220E" />
                <span>{user.wallet} ₽</span>
              </div>
              <Link className={styles.avatar} to={`/profile/${userId}`}>
                <img
                  src={`http://localhost:3042/${user.avatar}`}
                  alt="avatar"
                />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
