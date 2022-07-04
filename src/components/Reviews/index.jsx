import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, postReview } from "../../features/reviewsSlice";
import styles from "./Reviews.module.css";
import Rating from "@mui/material/Rating";
import LoadPreloader from "../LoadPreloader";

const Reviews = ({ userId, id }) => {
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const authUser = useSelector((state) => state.auth.authUser);
  const loading = useSelector((state) => state.reviewsReducer.loading);
  const [grade, setGrade] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const noRepeatReviews = reviews.find(
    (review) => review.user._id === authUser._id
  );

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!noRepeatReviews) {
      dispatch(postReview({ text, grade, userId }));
    }
  };

  return (
    <>
      <h2 className={styles.title}>Отзывы:</h2>
      {userId !== authUser._id && (
        <>
          <form onSubmit={(e) => handleSubmitReview(e)}>
            <input
              value={text}
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
            <button>Отправить</button>
          </form>
          <Rating
            name="simple-controlled"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            size="large"
          />
        </>
      )}
      <div className={styles.scroll}>
        {loading && <LoadPreloader />}
        {reviews.map((review) => {
          return (
            <div key={review._id} className={styles.review}>
              <div className={styles.header}>
                <div className={styles.avatar}>
                  <img
                    src={`http://localhost:3042/${review.user.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div className={styles.name}>
                  <span>{review.user.name} </span>
                  <span>{review.user.lastname}</span>
                </div>
              </div>
              <div className={styles.rating}>
                <span className={styles.subtitle}>Оценка:</span>
                <Rating
                  name="read-only"
                  value={review.grade}
                  size="large"
                  readOnly
                />
              </div>
              <div className={styles.text}>
                <p>{review.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Reviews;
