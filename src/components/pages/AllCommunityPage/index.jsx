import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  getAllCommunities,
  leaveRequest,
} from "../../../features/communitySlice";
import CreateCommunity from "../CreateCommunity";
import styles from "./AllCommunity.module.css";

const AllCommunities = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAll()
  }, [dispatch]);
  const getAll = () => {
    dispatch(getAllCommunities());

  }
  const [isCreated, setIsCreated] = useState(false);

  const communities = useSelector(
    (state) => state.communityReducer.communities
  );
  const userId = useSelector((state) => state.auth.authUser);

  const findRequest = communities.filter((com)=> com.requests.find(requst => requst._id === userId._id))
  
  const requestsHandler = (id) => {
    dispatch(leaveRequest({ id, userId, callback: getAll }));
  };

  return (
    <div className={styles.communities}>
      <button onClick={() => setIsCreated(true)}>Добавить</button>

      {isCreated && (
        <CreateCommunity setIsCreated={() => setIsCreated(false)} />
      )}
      {communities.map((elem) => {
        return (
          <div key={elem._id} className={styles.community}>
            <div className={styles.emblem}>
              <img src={`http://localhost:3042/${elem.emblem}`} alt="" />
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
                {userId._id !== elem.founder._id ? (
                  <button
                    // disabled={elem.requests._id === userId._id}
                    disabled={findRequest.find(item => item._id === elem._id)}
                    onClick={() => requestsHandler(elem._id)}
                  >
                    Вступить{" "}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCommunities;
