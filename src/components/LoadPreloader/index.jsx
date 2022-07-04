import React from "react";
import styles from "./LoadPreloader.module.css";
import dragon from "../../assets/images/drakon-animatsionnaya-kartinka-0130.gif";

const LoadPreloader = () => {
  return (
    <div className={styles.preloader}>
      <div>
        <img src={dragon} alt="drakonchik" />
      </div>
      <div className={styles.loadText}>Загрузка...</div>
    </div>
  );
};

export default LoadPreloader;
