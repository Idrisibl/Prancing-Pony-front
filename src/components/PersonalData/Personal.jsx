import React from "react";
import { FaMobileAlt, FaRegEdit } from "react-icons/fa";
import { GiSwapBag } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editAvatar } from "../../features/authSlice";
import styles from "./PersonalData.module.css";

const Personal = ({ user, userId, setOpened }) => {
  const dispatch = useDispatch();

  const handleUpdateAvatar = (file) => {
    dispatch(editAvatar({ file }));
    localStorage.setItem("avatar", user.avatar);
  };

  return (
    <div className={styles.personal}>
      <div className={styles.personalLeft}>
        <div className={styles.image}>
          <img
            src={
              user.avatar ? `http://localhost:3042/${user.avatar}` : user.avatar
            }
            alt="avatar"
          />
          {userId && (
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
            <img src="" alt="witcher" />
          </div>
          <div>
            <strong>Очки:</strong>
            <span>{user.rating}</span>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <span>{user.name} </span>
          <span>{user.lastname}</span>
          {userId && (
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
          <span>{user.email}</span>
        </div>
        <div className={styles.tel}>
          <FaMobileAlt fontSize="2.5rem" fill="#4D220E" />
          <strong>Телефон: </strong>
          <span>{user.tel}</span>
        </div>
        {userId && (
          <>
            <div className={styles.wallet}>
              <GiSwapBag size="3rem" fill="#4D220E" />
              <strong>Баланс:</strong>
              <span> {user.wallet} ₽</span>
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
  );
};

export default Personal;
