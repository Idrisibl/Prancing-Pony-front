import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneUser } from "../../../features/authSlice";
import PersonalData from "./PersonalData";
import styles from "./ProfilePage.module.css";
import Sidebar from "./Sidebar";

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <PersonalData authUser={authUser} id={id} />
      </div>
    </div>
  );
};

export default ProfilePage;
