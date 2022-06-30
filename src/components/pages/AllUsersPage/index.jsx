import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../features/authSlice";
import UserCard from "../../UserCard";
import { alfMaxSort, alfMinSort } from "../../../features/authSlice";

const AllUsersPage = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();


  const sortMax = () => {
    dispatch(alfMaxSort());
  };

  const sortMin = () => {
    dispatch(alfMinSort());
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1>Пользователи</h1>
      <div>
          Упорядочить по алфавиту
          <button class="material-symbols-outlined" onClick={sortMax}>
            +
          </button>
          <button class="material-symbols-outlined" onClick={sortMin}>
            -
          </button>
        </div>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </>
  );
};

export default AllUsersPage;
