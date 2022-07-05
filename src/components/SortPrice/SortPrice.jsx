import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { maxSort, minSort } from "../../features/tasksSlice";
import styles from "./Sort.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

const SortPrice = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();

  const sortMax = () => {
    dispatch(maxSort());
    setOpened(false);
  };

  const sortMin = () => {
    dispatch(minSort());
    setOpened(false);
  };

  return (
    <div className={styles.sort}>
      <div onClick={() => setOpened(!opened)} className={styles.dropdownTitle}>
        <IoMdArrowDropdown size="2.5rem" fill="#fff" />
        <span>Упорядочить по цене</span>
      </div>
      {opened && (
        <ul className={`${styles.popup} ${styles.top}`}>
          <li onClick={sortMax}>По возрастанию</li>
          <li onClick={sortMin}>По убыванию</li>
        </ul>
      )}
    </div>
  );
};

export default SortPrice;
