import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllNews } from "../../../features/newsSlice";
import { deleteCommunity, getCommunityById } from "../../../features/communitySlice";
import News from "../../News";
import Members from "../../Members/Members";
import styles from "./Community.module.css";

const CommunityById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const news = useSelector((state) => state.newsReducer.news);
  const { id } = useParams();
  
  const communityNews = news.filter((elem) => elem.community === id);

  const community = useSelector(
    (state) => state.communityReducer.comunnityById
  );
  console.log(community);
  const [isClicked, setIsClicked] = useState(true);
  const clickHandler = () => {
    setIsClicked(true);
  };
  const clickHandler2 = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getCommunityById(id));
  }, [dispatch, id]);

  const deleteCommunityHandler = (id) => {
   dispatch(deleteCommunity(id)).then(() => {
    navigate('/communities')
   })
  }

  if (!community || !news) {
    return "no com";
  }

  return (
    <div className={styles.community}>
      {community.founder._id ===  <button onClick={()=>deleteCommunityHandler(community._id)}>x</button>}
      <div className={styles.header}>
        <div className={styles.pic}>
          <img src={`http://localhost:3042/public/${community.emblem}`} alt="" />
        </div>
        <div className={styles.info}>
          <div>Название: {community.name}</div>
          <div>Учасники: {community.members.length}</div>
          <div>Рейтинг: {community.rating.length}</div>
          <div>Описание: {community.description}</div>
          <div className="founder">
            <img
              className={styles.image}
              src={`http://localhost:3042/${community.founder.avatar}`}
              alt=""
            />
            <div>Основатель: {community.founder.name}</div>
          </div>
        </div>
      </div>
      <div className={styles.routes}>
        <div onClick={clickHandler}>Новости</div>
        <div onClick={clickHandler2}>Участники</div>
      </div>
      <div>
        {!isClicked
          ? community.members.map((elem) => {
              return <Members members={elem} />;
            })
          : communityNews.map((news) => {
              return <News news={news} />;
            })}
      </div>
    </div>
  );
};

export default CommunityById;
