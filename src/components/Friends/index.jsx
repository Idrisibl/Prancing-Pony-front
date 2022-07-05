import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "../../features/authSlice";
import LoadPreloader from "../LoadPreloader";
import UserCard from "../UserCard";
import styles from "./Friends.module.css";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.auth.authUser.friends);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  if (loading) {
    return <LoadPreloader />;
  }

  return (
    <div className={styles.friends}>
      <h1>Друзья</h1>
      {friends.map((friend) => {
        return <UserCard key={friend._id} user={friend} friends={friends} />;
      })}
    </div>
  );
};

export default Friends;
