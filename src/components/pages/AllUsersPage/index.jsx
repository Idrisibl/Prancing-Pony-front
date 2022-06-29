import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../features/authSlice";
import UserCard from "../../UserCard";

const AllUsersPage = () => {
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1>Пользователи</h1>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </>
  );
};

export default AllUsersPage;
