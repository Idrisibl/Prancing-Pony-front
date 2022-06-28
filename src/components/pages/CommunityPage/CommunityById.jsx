import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllNews } from "../../../features/newsSlice";
import { getCommunityById } from "../../../features/communitySlice";
import News from "../../News";
import Members from "../../Members/Members";

const CommunityById = () => {
  const dispatch = useDispatch();

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

  console.log(communityNews, "ddd");

  if (!community || !news) {
    return "no com";
  }
  return (
    <div className="community">
      <div className="pic">
        <img src={`http://localhost:3042/${community.emblem}`} alt="" />
        <div className="info">
          <div>Название: {community.name}</div>
          <div>Учасники: {community.members.length}</div>
          <div>Рейтинг: {community.rating}</div>
          <div>Описание: {community.description}</div>
        </div>
      </div>
      <div className="founder">
        <img src={`http://localhost:3042/${community.founder.avatar}`} alt="" />
        <div>Основатель: {community.founder.name}</div>
      </div>
      <div>
          <div onClick={clickHandler}>Новости</div>
        <div onClick={clickHandler2}>Участники</div>
      </div>
      <div>
        {!isClicked
          ? community.members.map((elem)=> {
            return <Members members={elem}/>
          })
          : news.map((news) => {
              return <News news={news} />;
            })}
      </div>
    </div>
  );
};



export default CommunityById;

