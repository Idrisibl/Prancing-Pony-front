import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import styles from "./UserCard.module.css";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/users/${user._id}`}>
      <div className={styles.userCard}>
        <div className={styles.image}>
          <img src={`http://localhost:3042/${user.avatar}`} alt="" />
        </div>
        <div className={styles.data}>
          <span>{user.name}</span>
          <span>{user.lastname}</span>
        </div>
        <div className={styles.rating}>
          <span>{user.rating}</span>
          <span>Ранг</span>
        </div>
        <div className={styles.btn}>
          <span>
            <FaUserFriends size="3rem" />
          </span>
          <span>
            <BiMessageDots size="3rem" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
