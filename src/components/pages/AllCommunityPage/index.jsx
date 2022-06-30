import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getAllCommunities } from "../../../features/communitySlice";
import CreateCommunity from "../CreateCommunity";
import styles from "./AllCommunity.module.css";

const AllCommunities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);
  const [isCreated, setIsCreated] = useState(false)
  
  
  const communities = useSelector(
    (state) => state.communityReducer.communities
  );

  return (
    <div className={styles.communities}>
      <button onClick={()=>setIsCreated(true)}>Добавить</button>
      
      {isCreated && <CreateCommunity setIsCreated={()=>setIsCreated(false)}/>}
      {communities.map((elem) => {
        return (
          <div className={styles.community}>
            <div className={styles.emblem}>
              <img src={`http://localhost:3042/public/${elem.emblem}`} alt="" />
            </div>
            <div className={styles.name}>{elem.name}</div>
            <div className={styles.members}>
              Участников: {elem.members.length}
            </div>
            <div className={styles.btn}>
              <div>
                <Link to={`/communities/${elem._id}`}>Перейти</Link>
              </div>
              <div>
                <Link to={`/communities/${elem._id}`}>Вступить</Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default AllCommunities;
