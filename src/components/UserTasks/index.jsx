import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneUser } from "../../features/authSlice";
import Bag from "./Bag";
import Finished from "./Finished";
import styles from "./UserTasks.module.css";

const UserTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return (
    <div className={styles.content}>
      <Bag bag={user.bag} />
    </div>
  );
};

export default UserTasks;
