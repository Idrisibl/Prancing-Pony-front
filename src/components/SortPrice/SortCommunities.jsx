import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  membersMaxSort,
  membersMinSort,
  nameMaxSort,
  nameMinSort,
} from "../../features/communitySlice";
import styles from "./Sort.module.css";

const SortCommunities = () => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

  const nameSortMax = () => {
    dispatch(nameMaxSort());
    setOpened(false);
  };

  const nameSortMin = () => {
    dispatch(nameMinSort());
    setOpened(false);
  };
  const membersSortMax = () => {
    dispatch(membersMaxSort());
    setOpened(false);
  };

  const membersSortMin = () => {
    dispatch(membersMinSort());
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
          <li onClick={membersSortMax}>Участники(больше)</li>
          <li onClick={membersSortMin}>Участники(меньше)</li>
        </ul>
      )}
    </div>
  );
};

export default SortCommunities;
