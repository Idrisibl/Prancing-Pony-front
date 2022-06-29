import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { editInfo } from "../../features/authSlice";
import styles from "./Area.module.css";

const UserInfoArea = ({ setOpened }) => {
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();

  const handleUpdateInfo = () => {
    dispatch(editInfo(info));
    setOpened(false);
  };

  return (
    <div>
      <div>
        <textarea
          className={styles.textArea}
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
      </div>
      <div className={styles.addBtn}>
        <button disabled={!info} onClick={handleUpdateInfo}>
          <GiCheckMark size="3rem" fill={!info ? "gray" : "green"} />
        </button>
      </div>
    </div>
  );
};

export default UserInfoArea;
