import React from "react";
import Favourites from "./Favourites";
import styles from "./Favourites.module.css";

const FavoritePage = () => {
  return (
    <div className={styles.content}>
      <h1>Избранное</h1>
      <Favourites />
    </div>
  );
};

export default FavoritePage;
