import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../AddTaskModal/Modal.module.css";
import { GiCheckMark } from "react-icons/gi";
import InputMask from "react-input-mask";
import { editUser } from "../../features/authSlice";

const DataEditModal = ({ setOpened, authUser }) => {
  const [formData, setFormData] = React.useState({
    name: authUser.name,
    lastname: authUser.lastname,
    tel: authUser.tel,
    email: authUser.email,
  });
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();

  const handleEditData = () => {
    dispatch(editUser({ formData }));
    setOpened(false);
  };

  const handleChangeEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const disabled =
    formData.name || formData.lastname || formData.tel || formData.email;

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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              placeholder="Имя"
              maxLength="12"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              value={formData.lastname}
              placeholder="Фамилия"
              maxLength="12"
            />
          </div>
          <div>
            <InputMask
              mask="+7 (999) 999 9999"
              value={formData.tel}
              type="tel"
              placeholder="Телефон"
              onChange={(e) =>
                setFormData({ ...formData, tel: e.target.value })
              }
            ></InputMask>
          </div>
          <div>
            {emailError && <div>{emailError}</div>}
            <input
              type="email"
              onChange={(e) => handleChangeEmail(e)}
              value={formData.email}
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
