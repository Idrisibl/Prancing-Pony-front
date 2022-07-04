import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  getAllCommunities,
  leaveRequest,
} from "../../../features/communitySlice";
import CreateCommunity from "../CreateCommunity";
import styles from "./AllCommunity.module.css";
import {
  nameMaxSort,
  nameMinSort,
  membersMaxSort,
  membersMinSort,
} from "../../../features/communitySlice";
import button from "../CategoriesPage/Categories.module.css";

const AllCommunities = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAll();
  }, [dispatch]);
  const getAll = () => {
    dispatch(getAllCommunities());
  };
  const [isCreated, setIsCreated] = useState(false);

  const communities = useSelector(
    (state) => state.communityReducer.communities
  );

  //поиск + паганация
  const [value, setValue] = useState("");

  const [visible, setVisible] = useState(7);

  let filteredTasks = communities.filter((task) => {
    return task.name.toLowerCase().includes(value.toLowerCase());
  });

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 7);
  };

  /////////////////////////
  const userId = useSelector((state) => state.auth.authUser);
  console.log(communities, "com");
  console.log(userId, "user");

  const findRequest = communities.filter((com) =>
    com.requests.find((requst) => requst._id === userId._id)
  );

  console.log(findRequest, 767);
  const requestsHandler = (id) => {
    dispatch(leaveRequest({ id, userId, callback: getAll }));
    console.log(userId);
  };

  const nameSortMax = () => {
    dispatch(nameMaxSort());
  };

  const nameSortMin = () => {
    dispatch(nameMinSort());
  };
  const membersSortMax = () => {
    dispatch(membersMaxSort());
  };

  const membersSortMin = () => {
    dispatch(membersMinSort());
  };

  return (
    <>
      <div>
        Упорядочить по алфавиту
        <button onClick={nameSortMax}>А-Я</button>
        <button onClick={nameSortMin}>Я-А</button>
      </div>
      <div>
        Упорядочить по количеству участников
        <button onClick={membersSortMax}>Больше</button>
        <button onClick={membersSortMin}>Меньше</button>
      </div>

      <div>
        <input type="text" onChange={(event) => setValue(event.target.value)} />
      </div>

      <div className={styles.communities}>
        <button onClick={() => setIsCreated(true)}>Добавить</button>

        {isCreated && (
          <CreateCommunity setIsCreated={() => setIsCreated(false)} />
        )}
        {value
          ? filteredTasks.map((elem) => {
              return (
                <div key={elem._id} className={styles.community}>
                  <div className={styles.emblem}>
                    <img
                      src={`http://localhost:3042/public/${elem.emblem}`}
                      alt=""
                    />
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
                          disabled={findRequest.find(
                            (item) => item._id === elem._id
                          )}
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
            })
          : communities.slice(0, visible).map((elem) => {
              return (
                <div key={elem._id} className={styles.community}>
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
                      {userId._id !== elem.founder._id ? (
                        <button
                          // disabled={elem.requests._id === userId._id}
                          disabled={findRequest.find(
                            (item) => item._id === elem._id
                          )}
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
      <button
        className={
          communities.length === communities.slice(0, visible).length ||
          value.length !== 0
            ? button.btnShowMoreOff
            : button.btnShowMore
        }
        onClick={showMoreItems}
      >
        Показать еще
      </button>
    </>
  );
};

export default AllCommunities;
