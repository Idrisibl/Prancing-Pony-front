import styles from "./ProfilePage.module.css";
import Sidebar from "../../Sidebar";
import Profile from "../../Profile";
import LoadPreloader from "../../LoadPreloader";
import { useSelector } from "react-redux";

const PersonalArea = () => {
  const loading = useSelector((state) => state.auth.loading);

  return (
    <>
      {loading && <LoadPreloader />}
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.content}>
          <Profile />
        </div>
      </div>
    </>
  );
};

export default PersonalArea;
