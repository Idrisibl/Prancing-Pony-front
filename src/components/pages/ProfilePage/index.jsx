import styles from "./ProfilePage.module.css";
import Sidebar from "../../Sidebar";
import Profile from "../../Profile";
import LoadPreloader from "../../LoadPreloader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthUser, fetchOneUser } from "../../../features/authSlice";
import { Outlet, useParams } from "react-router-dom";

const PersonalArea = () => {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.authUser);
  const { id } = useParams();
  const candidate = id === user._id;

  return (
    <>
      {loading && <LoadPreloader />}
      <div className={styles.wrapper}>
        {candidate && <Sidebar />}
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PersonalArea;
