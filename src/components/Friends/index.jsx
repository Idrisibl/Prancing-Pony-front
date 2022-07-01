import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneUser } from "../../features/authSlice";

const Friends = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return <div>b</div>;
};

export default Friends;
