import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../features/reviewsSlice";
import styles from "./Reviews.module.css";

const Reviews = ({ userId }) => {
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const [rating, setRating] = useState();
  const dispatch = useDispatch();

  const optionsHandler = (e) => {
    setRating(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchReviews(userId));
  }, [dispatch, userId]);

  return (
    <>
      <h2>Отзывы:</h2>
      {reviews.map((review) => {
        return (
          <div key={review._id} className={styles.review}>
            <div className={styles.avatar}>
              <img
                src={`http://localhost:3042/${review.user.avatar}`}
                alt="avatar"
              />
            </div>
            <div className={styles.name}>
              <span>{review.user.name}</span>
              <span>{review.user.lastname}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Reviews;
