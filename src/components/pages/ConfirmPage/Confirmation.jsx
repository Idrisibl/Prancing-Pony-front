import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToFailed,
  addToFinished,
  fetchAuthUser,
  removeFromBag,
  removeFromConfirmation,
} from "../../../features/authSlice";
import LoadPreloader from "../../LoadPreloader";
import styles from "./Confirmation.module.css";

const Confirmation = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  const handleAccept = (userId, taskId, id) => {
    dispatch(removeFromConfirmation(id)).then(() => {
      dispatch(fetchAuthUser());
    });
    dispatch(addToFinished({ userId, taskId }));
    dispatch(removeFromBag({ userId, taskId }));
  };

  const handleReject = (userId, taskId, id) => {
    dispatch(removeFromConfirmation(id)).then(() => {
      dispatch(fetchAuthUser());
    });
    dispatch(addToFailed({ userId, taskId }));
    dispatch(removeFromBag({ userId, taskId }));
  };

  if (!authUser.confirmation || !authUser.confirmation.length) {
    return "no confirmations";
  }

  return (
    <div className={styles.content}>
      <h1>Подтверждения</h1>
      {loading ? (
        <LoadPreloader />
      ) : (
        authUser.confirmation.map((confirmation) => (
          <div className={styles.confirmation} key={confirmation._id}>
            <div className={styles.image}>
              <Link to={`/profile/${confirmation.user._id}`}>
                <img
                  src={`http://localhost:3042/${confirmation.user?.avatar}`}
                  alt="avatar"
                />
              </Link>
            </div>
            <div className={styles.name}>
              <span>{confirmation.user.name} </span>
              <span>{confirmation.user.lastname}</span>
            </div>
            <div>
              <span>{confirmation.task.title}</span>
            </div>
            <div>
              <button
                onClick={() =>
                  handleAccept(
                    confirmation.user._id,
                    confirmation.task._id,
                    confirmation._id
                  )
                }
              >
                Подтвердить
              </button>
              <button
                onClick={() =>
                  handleReject(
                    confirmation.user._id,
                    confirmation.task._id,
                    confirmation._id
                  )
                }
              >
                Отклонить
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Confirmation;
