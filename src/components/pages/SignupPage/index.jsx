import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../features/authSlice";
import styles from "./Signup.module.css";
import { AiFillEye } from "react-icons/ai";

const Signup = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const [nameDirty, setNameDirty] = useState(false);
  const [LastnameDirty, setLastnameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState("Это поле должно быть заполнено");
  const [LastnameError, setLastnameError] = useState(
    "Это поле должно быть заполнено"
  );
  const [emailError, setEmailError] = useState(
    "Это поле должно быть заполнено"
  );
  const [passwordError, setPasswordError] = useState(
    "Это поле должно быть заполнено"
  );

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (!e.target.value) {
      setNameError("Это поле должно быть заполнено");
    } else {
      setNameError("");
    }
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
    if (!e.target.value) {
      setLastnameError("Это поле должно быть заполнено");
    } else {
      setLastnameError("");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
      if (!e.target.value) {
        setEmailError("Это поле должно быть заполнено");
      }
    } else {
      setEmailError("");
    }
  };

  const handleChangeTel = (e) => {
    setTel(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 5) {
      setPasswordError("пароль не должен быть меньше 5 символов");
      if (!e.target.value) {
        setPasswordError("Это поле должно быть заполнено");
      }
    } else {
      setPasswordError("");
    }
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "name":
        setNameDirty(true);
        break;
      case "Lastname":
        setLastnameDirty(true);
        break;
      default:
        return false;
    }
  };

  const addUser = (e) => {
    e.preventDefault();
    if (disabled.trim) {
      dispatch(registerUser({ name, lastname, email, tel, password }))
        .unwrap()
        .then(() => navigate("/signin"));
      setName("");
      setLastname("");
      setEmail("");
      setTel("");
      setPassword("");
    }
  };

  const disabled = name && lastname && email && password && tel;

  return (
    <div className={styles.wrapper}>
      <div className={styles.signup}>
        <h1>Регистрация</h1>
        <form className={styles.form} onSubmit={(e) => addUser(e)}>
          {error && (
            <div className={styles.error}>
              Такой пользователь уже существует
            </div>
          )}
          <div className={styles.input}>
            <input
              name="name"
              value={name}
              type="text"
              placeholder="Введите ваше имя"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangeName(e)}
            />
            {nameDirty && nameError && (
              <div className={styles.error}>{nameError}</div>
            )}
          </div>
          <div className={styles.input}>
            <input
              name="Lastname"
              type="text"
              value={lastname}
              placeholder="Введите вашу фамилию"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangeLastname(e)}
            />
            {LastnameDirty && LastnameError && (
              <div className={styles.error}>{LastnameError}</div>
            )}
          </div>
          <div className={styles.input}>
            <InputMask
              mask="+7 (999) 999 9999"
              value={tel}
              type="tel"
              placeholder="Телефон"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangeTel(e)}
            ></InputMask>
          </div>
          <div className={styles.input}>
            <input
              name="email"
              value={email}
              type="email"
              placeholder="name@example.com"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangeEmail(e)}
            />
            {emailDirty && emailError && (
              <div className={styles.error}>{emailError}</div>
            )}
          </div>
          <div className={`${styles.input} ${styles.password}`}>
            <input
              name="password"
              value={password}
              type={visible ? "text" : "password"}
              placeholder="Пароль"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChangePassword(e)}
            />
            {passwordDirty && passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
            <span className={styles.eye} onClick={() => setVisible(!visible)}>
              <AiFillEye />
            </span>
          </div>
          <button disabled={!disabled}>Регистрация</button>
        </form>
        <div className={styles.signinLink}>
          <span>
            Уже есть аккаунт? <Link to="/signin">Войти</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
