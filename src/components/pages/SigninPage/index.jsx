import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/authSlice";
import styles from "./Signin.module.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const signinUp = useSelector((state) => state.auth.signinUp);
  const navigate = useNavigate();

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [emailError, setEmailError] = useState(
    "Это поле должно быть заполнено"
  );
  const [passwordError, setPasswordError] = useState(
    "Это поле должно быть заполнено"
  );

  const dispatch = useDispatch();

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

  const handleSignin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => navigate("/"));

      setEmail("");
      setPassword("");
    }
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "password":
        setPasswordDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      default:
        return false;
    }
  };

  const disabled = email && password;

  return (
    <div className={styles.signin}>
      <h1>Авторизация</h1>
      {error && (
        <div className={styles.error}>
          Введены неверные данные. Попробуйте еще раз.
        </div>
      )}
      <form className={styles.form} onSubmit={(e) => handleSignin(e)}>
        <div className={styles.login}>
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
        <div className={styles.password}>
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
          <span onClick={() => setVisible(!visible)}>👁</span>
        </div>
        <button disabled={!disabled && signinUp}>Войти</button>
      </form>
    </div>
  );
};

export default Signin;
