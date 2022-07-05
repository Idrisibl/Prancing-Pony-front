import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchAuthUser } from "../../../features/authSlice";
import UserCard from "../../UserCard";
import { useState } from "react";
import LoadPreloader from "../../LoadPreloader";
import button from "../CategoriesPage/Categories.module.css";
import styles from "./AllUsers.module.css";
import SortUsers from "../../SortPrice/SortUsers";

const AllUsersPage = () => {
  const users = useSelector((state) => state.auth.users);
  const friends = useSelector((state) => state.auth.authUser.friends);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tasksSlice.loading);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAuthUser());
  }, [dispatch]);

  const [visible, setVisible] = useState(7);
  const [value, setValue] = useState("");

  const filteredUsers = users.filter((user) => {
    const fio = `${user.name.toLowerCase()} ${user.lastname.toLowerCase()}`;
    return fio.includes(value.toLowerCase());
  });

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 7);
  };

  return (
    <div className={styles.content}>
      {loading && <LoadPreloader />}
      <h1>Пользователи</h1>
      <div className={styles.search}>
        <input
          placeholder="Поиск пользователей..."
          type="text"
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <SortUsers />
      {value ? (
        <div>
          {filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} friends={friends} />
          ))}{" "}
          <button
            className={
              users.length === users.slice(0, visible).length ||
              value.length !== 0
                ? button.btnShowMoreOff
                : button.btnShowMore
            }
            onClick={showMoreItems}
          >
            Показать еще
          </button>
        </div>
      ) : (
        <div>
          {users.slice(0, visible).map((user) => (
            <UserCard key={user._id} user={user} friends={friends} />
          ))}{" "}
          <div className={styles.btnWrapper}>
            <button
              className={
                users.length === users.slice(0, visible).length ||
                value.length !== 0
                  ? button.btnShowMoreOff
                  : button.btnShowMore
              }
              onClick={showMoreItems}
            >
              Показать еще
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersPage;
