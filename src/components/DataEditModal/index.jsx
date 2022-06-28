import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../AddTaskModal/Modal.module.css";
import { GiCheckMark } from "react-icons/gi";
import InputMask from "react-input-mask";
import { editUser } from "../../features/authSlice";

const DataEditModal = ({ setOpened }) => {
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();

  const handleEditData = () => {
    dispatch(editUser({ name, lastname, tel, email }));
    setOpened(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const disabled = name && lastname && tel && email;

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <button onClick={() => setOpened(false)}>X</button>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Имя"
              maxLength="12"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              placeholder="Фамилия"
              maxLength="12"
            />
          </div>
          <div>
            <InputMask
              mask="+7 (999) 999 9999"
              value={tel}
              type="tel"
              placeholder="Телефон"
              onChange={(e) => setTel(e.target.value)}
            ></InputMask>
          </div>
          <div>
            {emailError && <div>{emailError}</div>}
            <input
              type="email"
              onChange={(e) => handleChangeEmail(e)}
              value={email}
              placeholder="Почта@"
            />
          </div>
          <div className={styles.addBtn}>
            <button disabled={!disabled || emailError} onClick={handleEditData}>
              <GiCheckMark
                size="3rem"
                fill={!disabled || emailError ? "gray" : "green"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEditModal;
