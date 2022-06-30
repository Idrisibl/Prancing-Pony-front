import styles from "./ProfilePage.module.css";
import Sidebar from "../../Sidebar";
import Profile from "../../Profile";
import LoadPreloader from "../../LoadPreloader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthUser } from "../../../features/authSlice";

const PersonalArea = () => {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadPreloader />}
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.content}>
          <Profile user={authUser} />
        </div>
      </div>
    </>
  );
};

export default PersonalArea;
