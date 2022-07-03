import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import UserInfoArea from "../UserInfoArea";
import styles from "./PersonalData.module.css";

const UserInfo = ({ user }) => {
  const [opened, setOpened] = useState();

  return (
    <>
      <div className={styles.userInfo}>
        <div className={styles.edit} onClick={() => setOpened(!opened)}>
          <FaRegEdit size="1.5rem" fill="rgba(0, 0, 0, 0.5)" />
          <span>Редактировать</span>
        </div>

        {opened ? (
          <UserInfoArea setOpened={setOpened} />
        ) : !user.info ? (
          <div className={styles.notEmpty}>
            Вы не заполнили информацию о себе
          </div>
        ) : (
          <div className={styles.desk}>
            <p>{user.info}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfo;
