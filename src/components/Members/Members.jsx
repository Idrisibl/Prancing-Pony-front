// import { useDispatch } from "react-redux"
// import { deleteUser } from "../../features/communitySlice"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "../../features/authSlice";
import UserCard from "../UserCard";

const Members = ({ members, founder, community }) => {
  const friends = useSelector((state) => state.auth.authUser.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  // const dispatch = useDispatch()
  // const deleteHander = () => {
  //     dispatch(deleteUser({members, community }))
  // }

  return (
    <div className="container">
      <UserCard user={members} friends={friends} />
    </div>
  );
};
export default Members;
// {members._id !== founder._id ? (
// <button onClick={()=>deleteHander()}>Удалить</button>
// ) : (
//   ""
//   )}
