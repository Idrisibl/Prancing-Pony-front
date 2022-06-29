import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneUser } from "../../features/authSlice";
import PersonalData from "../PersonalData";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchOneUser(id));
  }, [dispatch, id]);

  return (
    <>
      <PersonalData authUser={authUser} id={id} />
    </>
  );
};

export default Profile;
