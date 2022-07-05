import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import styles from "./UserCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addChat } from "../../features/chatRequests";
import Rangs from "../Rangs";

const UserCard = ({ user }) => {
  const senderId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const handleAddChat = async (receiverId) => {
    const data = { receiverId, senderId };
    try {
      const res = await addChat(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    navigate("/chat");
  };

  return (
    <Link to={`/profile/${user._id}`}>
      <div className={styles.userCard}>
        <div className={styles.image}>
          <img src={`http://localhost:3042/${user.avatar}`} alt="" />
        </div>
        <div className={styles.data}>
          <span>{user.name}</span>
          <span>{user.lastname}</span>
        </div>
        <div className={styles.rating}>
          <span>Очки:{user.rating}</span>
          {``}
          <div className={styles.rangWrapper}>
            <div>Ранг:</div>
            <div className={styles.rangsIconWrapper}>
              <Rangs user={user} />
            </div>
          </div>
        </div>
        <div className={styles.btn}>
          <span>
            <FaUserFriends size="3rem" />
          </span>
          <span>
            <BiMessageDots
              onClick={() => handleAddChat(user._id)}
              size="3rem"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
