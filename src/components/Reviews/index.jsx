import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../features/reviewsSlice";

const Reviews = ({ userId }) => {
  const reviews = useSelector((state) => state.reviewsReducer.reviews);
  const dispatch = useDispatch();
  console.log(reviews);

  useEffect(() => {
    dispatch(fetchReviews(userId));
  }, [dispatch, userId]);

  return (
    <>
      {reviews.map((review) => {
        return <div>{review.text}</div>;
      })}
    </>
  );
};

export default Reviews;
