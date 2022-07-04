import React, { useState } from "react";
import styles from "./PersonalData.module.css";
import UserInfo from "./UserInfo";
import DataEditModal from "../DataEditModal";
import Reviews from "../Reviews";
import Personal from "./Personal";
import { useSelector } from "react-redux";

const PersonalData = ({ user, id }) => {
  const [opened, setOpened] = useState();
  const authId = useSelector((state) => state.auth.id);
  const candidate = user._id === authId;

  return (
    <div className={styles.wrapper}>
      {opened && <DataEditModal setOpened={setOpened} user={user} />}
      <Personal
        candidate={candidate}
        user={user}
        id={id}
        setOpened={setOpened}
      />
      <h2>О себе:</h2>
      {candidate ? (
        <UserInfo user={user} id={id} />
      ) : user.info ? (
        <div className={styles.desc}>{user.info}</div>
      ) : (
        <div className={styles.notEmpty}>Пусто</div>
      )}
      <Reviews userId={user._id} id={id} />
    </div>
  );
};

export default PersonalData;
