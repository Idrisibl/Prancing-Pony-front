import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getAllCommunities } from "../../../features/communitySlice";

const AllCommunities = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);
  const communities = useSelector((state) => state.communityReducer.communities);
  console.log(communities);
  return (
    <div className="AllCommunities">
      {communities.map((elem) => {
        return (
          <div className="container">
            <div className="header">
                <div>{elem.name}</div>
            </div>
            <div className="description">
              <img src={`http://localhost:3042/${elem.emblem}`} alt="" />
               <div>Количество участников: { elem.members.length}</div>
                <Link to={`/communities/${elem._id}`}>
               <div>Перейти</div>
                </Link>
               <div>Вступить</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCommunities
