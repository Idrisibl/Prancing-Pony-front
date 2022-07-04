import { useDispatch } from "react-redux";
import { addMember, deleteFromRequest } from "../../features/communitySlice";

const Requests = ({ communityId, requests, communityFounderId, userId,  getCommunityById}) => {
  const dispatch = useDispatch();
  const confirmEntering = () => {
    dispatch(addMember({ communityId, requests, getCommunityById }));
    dispatch(deleteFromRequest({ communityId, requests, getCommunityById }));
  };

  return (
    <div>
      {communityFounderId === userId._id ? (
        <button onClick={confirmEntering}>add</button>
      ) : (
        ""
      )}
      <img src={`http://localhost:3042/${requests.avatar}`} alt="" />
      <div>{requests.name}</div>
      <div>{requests.info}</div>
      <div>{requests.email}</div>
    </div>
  );
};

export default Requests;
