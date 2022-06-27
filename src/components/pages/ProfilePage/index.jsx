import styles from "./ProfilePage.module.css";
import Sidebar from "../../Sidebar";
import Profile from "../../Profile";

const PersonalArea = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <Profile />
      </div>
    </div>
  );
};

export default PersonalArea;
