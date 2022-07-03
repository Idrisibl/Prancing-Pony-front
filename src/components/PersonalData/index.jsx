import React, { useState } from "react";
import styles from "./PersonalData.module.css";
import UserInfo from "./UserInfo";
import DataEditModal from "../DataEditModal";
import Reviews from "../Reviews";
import Personal from "./Personal";

const PersonalData = ({ user, id }) => {
  const [opened, setOpened] = useState();

  return (
    <>
      {opened && <DataEditModal setOpened={setOpened} user={user} />}
      <Personal user={user} userId={id} setOpened={setOpened} />
      <h2>О себе:</h2>
      {id ? (
        <UserInfo user={user} id={id} />
      ) : user.info ? (
        <div>{user.info}</div>
      ) : (
        <div className={styles.notEmpty}>Пусто</div>
      )}
      <Reviews userId={user._id} />
    </>
  );
};

export default PersonalData;
