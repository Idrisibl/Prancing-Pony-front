import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import styles from "./UserCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../features/chatRequests";
import {
  addToFriends,
  fetchAuthUser,
  removeFromFriends,
} from "../../features/authSlice";
import LoadPreloader from "../LoadPreloader";

const UserCard = ({ user, friends }) => {
  const senderId = useSelector((state) => state.auth.id);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
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

  const friend = friends.find((friend) => friend._id === user._id);

  const handleAddFriends = (userId) => {
    dispatch(addToFriends({ userId })).then(() => dispatch(fetchAuthUser()));
  };

  const handleRemoveFromFriends = (userId) => {
    dispatch(removeFromFriends({ userId })).then(() =>
      dispatch(fetchAuthUser())
    );
  };

  if (!user || !friends) {
    return <div>...</div>;
  }

  return (
    <>
      {loading && <LoadPreloader />}
      <div className={styles.userCard}>
        <Link to={`/profile/${user._id}`}>
          <div className={styles.image}>
            <img src={`http://localhost:3042/${user.avatar}`} alt="" />
          </div>
        </Link>
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
            {!friend ? (
              <FaUserFriends
                onClick={() => handleAddFriends(user._id)}
                size="3rem"
              />
            ) : (
              <MdPersonRemoveAlt1
                onClick={() => handleRemoveFromFriends(user._id)}
                size="3rem"
              />
            )}
          </span>
          <span>
            <BiMessageDots
              onClick={() => handleAddChat(user._id)}
              size="3rem"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
