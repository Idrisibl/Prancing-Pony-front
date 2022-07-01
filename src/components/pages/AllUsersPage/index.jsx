import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../features/authSlice";
import UserCard from "../../UserCard";
import {
  alfMaxSort,
  alfMinSort,
  ratingMaxSort,
  ratingMinSort,
} from "../../../features/authSlice";
import { useState } from "react";
import LoadPreloader from "../../LoadPreloader";
import button from "../CategoriesPage/Categories.module.css";

const AllUsersPage = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksSlice.tasks);
  const loading = useSelector((state) => state.tasksSlice.loading);

  const nameSortMax = () => {
    dispatch(alfMaxSort());
  };

  const nameSortMin = () => {
    dispatch(alfMinSort());
  };

  const ratingSortMax = () => {
    dispatch(ratingMaxSort());
  };

  const ratingSortMin = () => {
    dispatch(ratingMinSort());
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [visible, setVisible] = useState(7);
  const [value, setValue] = useState("");

  const filteredUsers = users.slice(0, visible).filter((user) => {
    return user.name.toLowerCase().includes(value.toLowerCase());
  });

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 7);
  };

  return (
    <>
      {loading && <LoadPreloader />}
      <h1>Пользователи</h1>
      <div>
        <input type="text" onChange={(event) => setValue(event.target.value)} />
      </div>
      <div>
        Упорядочить по алфавиту
        <button class="material-symbols-outlined" onClick={nameSortMax}>
          А-Я
        </button>
        <button class="material-symbols-outlined" onClick={nameSortMin}>
          Я-А
        </button>
      </div>
      <div>
        Упорядочить по рейтингу
        <button class="material-symbols-outlined" onClick={ratingSortMax}>
          Сначала по топовым
        </button>
        <button class="material-symbols-outlined" onClick={ratingSortMin}>
          Сначала по низким
        </button>
      </div>
      {filteredUsers.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}{" "}
      <button
        // className={styles.btnShowMore}
        className={
          users.length === users.slice(0, visible).length || value.length !== 0
            ? button.btnShowMoreOff
            : button.btnShowMore
        }
        onClick={showMoreItems}
      >
        Показать еще
      </button>
    </>
  );
};

export default AllUsersPage;
