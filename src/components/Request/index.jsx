import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "../../features/authSlice";
import { addMember, deleteFromRequest } from "../../features/communitySlice";
import UserCard from "../UserCard";

const Requests = ({
  communityId,
  requests,
  communityFounderId,
  userId,
  getCommunityById,
}) => {
  const friends = useSelector((state) => state.auth.authUser.friends);
  const dispatch = useDispatch();
  const confirmEntering = () => {
    dispatch(addMember({ communityId, requests, getCommunityById }));
    dispatch(deleteFromRequest({ communityId, requests, getCommunityById }));
  };

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  return (
    <div>
      {communityFounderId === userId._id ? (
        <button onClick={confirmEntering}>add</button>
      ) : (
        ""
      )}
      <UserCard user={requests} friends={friends} />
    </div>
  );
};

export default Requests;
