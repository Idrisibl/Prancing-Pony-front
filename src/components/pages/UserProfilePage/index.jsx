import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllUsers, fetchOneUser } from "../../../features/authSlice";
import LoadPreloader from "../../LoadPreloader";
import PersonalData from "../../PersonalData";
import styles from "./UserProfile.module.css";

const UserProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.users);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return (
    <>  
      {loading && <LoadPreloader />}
      <div className={styles.content}>
        <PersonalData authUser={user} loading={loading}/>
      </div>
    </>
  );
};

export default UserProfilePage;
