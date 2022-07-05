import React from "react";
import bronze from "../../assets/images/bronze.png";
import silver from "../../assets/images/silver.png";
import gold from "../../assets/images/gold.png";
import plat from "../../assets/images/plat.png";
import master from "../../assets/images/master.png";
import styles from "./Rangs.module.css";

function Rangs({ user }) {
  if (user.rating <= 10) {
    return <img className={styles.rangIcon} src={bronze} alt="bronze" />;
  } else if (user.rating >= 10 && user.rating < 20) {
    return <img className={styles.rangIcon} src={silver} alt="silver" />;
  } else if (user.rating >= 20 && user.rating < 30) {
    return <img className={styles.rangIcon} src={gold} alt="gold" />;
  } else if (user.rating >= 30 && user.rating < 50) {
    return <img className={styles.rangIcon} src={plat} alt="platin" />;
  } else if (user.rating >= 50) {
    return <img className={styles.rangIcon} src={master} alt="master" />;
  }
}

export default Rangs;
