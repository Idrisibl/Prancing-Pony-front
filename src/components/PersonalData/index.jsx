import React, { useState } from "react";
import { FaMobileAlt, FaRegEdit } from "react-icons/fa";
import { GiSwapBag } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editAvatar } from "../../features/authSlice";
import styles from "./PersonalData.module.css";
import witcher from "../../assets/images/witcher.png";
import UserInfo from "./UserInfo";
import DataEditModal from "../DataEditModal";
import Reviews from "../Reviews";

const PersonalData = ({ authUser, id }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState();

  const handleUpdateAvatar = (file) => {
    dispatch(editAvatar({ file }));
    localStorage.setItem("avatar", authUser.avatar);
  };

  return (
    <>
      {opened && <DataEditModal setOpened={setOpened} authUser={authUser} />}
      <div className={styles.personal}>
        <div className={styles.personalLeft}>
          <div className={styles.image}>
            <img
              src={
                authUser.avatar
                  ? `http://localhost:3042/${authUser.avatar}`
                  : authUser.avatar
              }
              alt="avatar"
            />
            {id && (
              <div className={styles.editor}>
                <input
                  type="file"
                  id="upload"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    handleUpdateAvatar(e.target.files[0]);
                  }}
                />
                <label htmlFor="upload">
                  <FaRegEdit size="3rem" />
                </label>
              </div>
            )}
          </div>
          <div className={styles.rank}>
            <div>
              <strong>Ранг:</strong>
              <img src={witcher} alt="witcher" />
            </div>
            <div>
              <strong>Очки:</strong>
              <span>{authUser.rating}</span>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            <span>{authUser.name} </span>
            <span>{authUser.lastname}</span>
            {id && (
              <FaRegEdit
                onClick={() => setOpened(true)}
                cursor="pointer"
                size="2.5rem"
                fill="rgba(0, 0, 0, 0.5)"
              />
            )}
          </div>
          <div className={styles.email}>
            <MdEmail fontSize="2.5rem" fill="#4D220E" />
            <strong>Почта: </strong>
            <span>{authUser.email}</span>
          </div>
          <div className={styles.tel}>
            <FaMobileAlt fontSize="2.5rem" fill="#4D220E" />
            <strong>Телефон: </strong>
            <span>{authUser.tel}</span>
          </div>
          {id && (
            <>
              <div className={styles.wallet}>
                <GiSwapBag size="3rem" fill="#4D220E" />
                <strong>Баланс:</strong>
                <span> {authUser.wallet} ₽</span>
              </div>
              <div className={styles.payments}>
                <div>
                  <span>Пополнить баланс</span>
                  <button>+</button>
                </div>
                <div>
                  <span>Снять</span>
                  <button>-</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <h2>О себе:</h2>
      {id ? (
        <UserInfo authUser={authUser} id={id} />
      ) : authUser.info ? (
        <div>{authUser.info}</div>
      ) : (
        <div className={styles.notEmpty}>Пусто</div>
      )}
      <Reviews userId={authUser._id} />
    </>
  );
};

export default PersonalData;
