import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneUser } from "../../features/authSlice";
import PersonalData from "../PersonalData";
import Reviews from "../Reviews";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);
  

  return (
    <>
      <PersonalData user={user} id={id} />
    </>
  );
};

export default Profile;
