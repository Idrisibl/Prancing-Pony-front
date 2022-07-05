import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuthUser } from "../../features/authSlice";
import Bag from "./Bag";
import Failed from "./Failed";
import Finished from "./Finished";
import MyTasks from "./MyTasks";
import styles from "./UserTasks.module.css";

const UserTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const [bag, setBag] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);
  const [myTasks, setMyTasks] = useState(true);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  const handleChangeBag = () => {
    setBag(true);
    setFinished(false);
    setFailed(false);
    setMyTasks(false);
  };

  const handleChangeFinished = () => {
    setFinished(true);
    setBag(false);
    setFailed(false);
    setMyTasks(false);
  };

  const handleChangeFailed = () => {
    setFailed(true);
    setBag(false);
    setFinished(false);
    setMyTasks(false);
  };

  const handleChangeMyTasks = () => {
    setMyTasks(true);
    setFailed(false);
    setBag(false);
    setFinished(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.links}>
        <div onClick={handleChangeMyTasks}>Мои задания</div>
        <div onClick={handleChangeBag}>Выполняются</div>
        <div onClick={handleChangeFinished}>Выполненные</div>
        <div onClick={handleChangeFailed}>Проваленные</div>
      </div>
      <div className={styles.content}>
        {bag && <Bag bag={authUser.bag} />}
        {finished && <Finished finished={authUser.finished} />}
        {failed && <Failed failed={authUser.failed} />}
        {myTasks && <MyTasks id={id} />}
      </div>
    </div>
  );
};

export default UserTasks;
