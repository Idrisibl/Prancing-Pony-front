import React from "react";
import { useParams } from "react-router-dom";
import PersonalData from "../PersonalData";

const Profile = ({user}) => {
  const { id } = useParams();

  return (
    <>
      <PersonalData user={user} id={id} />
    </>
  );
};

export default Profile;
