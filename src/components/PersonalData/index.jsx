import React from "react";
import { FaMobileAlt, FaRegEdit } from "react-icons/fa";
import { GiSwapBag } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editAvatar } from "../../features/authSlice";
import styles from "./PersonalData.module.css";
import witcher from "../../assets/images/witcher.png";

const PersonalData = ({ authUser }) => {
  const dispatch = useDispatch();

  const handleUpdateAvatar = (file) => {
    dispatch(editAvatar({ file }));
    localStorage.setItem("avatar", authUser.avatar);
  };

  return (
    <>
      <div className={styles.personal}>
        <div>
          <div className={styles.image}>
            <img
              src={
                authUser.avatar
                  ? `http://localhost:3042/${authUser.avatar}`
                  : authUser.avatar
              }
              alt="avatar"
            />
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
          </div>
          <div className={styles.rating}>
            <strong>Рейтинг:</strong>
            <span> 150</span>
            <img src={witcher} alt="witcher" />
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            <span>{authUser.name} </span>
            <span>{authUser.lastname}</span>
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
        </div>
      </div>
      <div>
        <h2>Информация:</h2>
        <div>
          <FaRegEdit size="1rem" />
          <span>Редактировать</span>
        </div>
        <div className={styles.information}>
          <p>{authUser.info}</p>
        </div>
      </div>
    </>
  );
};

export default PersonalData;
