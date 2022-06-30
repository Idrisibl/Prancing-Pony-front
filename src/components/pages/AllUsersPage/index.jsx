import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../features/authSlice";
import UserCard from "../../UserCard";
import { alfMaxSort, alfMinSort, ratingMaxSort, ratingMinSort } from "../../../features/authSlice";

const AllUsersPage = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();


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

  return (
    <>
      <h1>Пользователи</h1>
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
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </>
  );
};

export default AllUsersPage;
