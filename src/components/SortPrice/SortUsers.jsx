import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  alfMaxSort,
  alfMinSort,
  ratingMaxSort,
  ratingMinSort,
} from "../../features/authSlice";
import styles from "./Sort.module.css";

const SortUsers = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const nameSortMax = () => {
    dispatch(alfMaxSort());
    setOpened(false);
  };

  const nameSortMin = () => {
    dispatch(alfMinSort());
    setOpened(false);
  };

  const ratingSortMax = () => {
    dispatch(ratingMaxSort());
    setOpened(false);
  };

  const ratingSortMin = () => {
    dispatch(ratingMinSort());
    setOpened(false);
  };

  return (
    <div className={styles.sort}>
      <div onClick={() => setOpened(!opened)} className={styles.dropdownTitle}>
        <IoMdArrowDropdown size="2.5rem" fill="#fff" />
        <span>Сортировать по:</span>
      </div>
      {opened && (
        <ul className={`${styles.popup} ${styles.top}`}>
          <li onClick={nameSortMax}>Алфавит(А-Я)</li>
          <li onClick={nameSortMin}>Алфавит(Я-А)</li>
          <li onClick={ratingSortMax}>Рейтинг(топ)</li>
          <li onClick={ratingSortMin}>Рейтинг(низ)</li>
        </ul>
      )}
    </div>
  );
};

export default SortUsers;
