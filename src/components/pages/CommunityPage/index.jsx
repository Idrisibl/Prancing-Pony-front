import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllNews } from "../../../features/newsSlice";
import {
  deleteCommunity,
  editCommunity,
  editEmblem,
  getCommunityById,
} from "../../../features/communitySlice";
import News from "../../News";
import Members from "../../Members/Members";
import styles from "./Community.module.css";
import CreateNews from "../CreateNews";
import Requests from "../../Request";
import EditProfileCommunity from "../../EditProfileCommunity";
import LoadPreloader from "../../LoadPreloader";

const CommunityById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const news = useSelector((state) => state.newsReducer.news);
  const { id } = useParams();

  const communityNews = news.filter((elem) => elem.community === id);

  console.log(communityNews, "comnews");

  const community = useSelector(
    (state) => state.communityReducer.comunnityById
  );
  const communityLoading = useSelector(
    (state) => state.communityReducer.loading
  );
  const userId = useSelector((state) => state.auth.authUser);
  const [isNews, setIsNews] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [requests, setRequests] = useState(false);
  const [editProfile, setEditProfile] = useState(false)
  
  const newsHandler = () => {
    setIsNews(true);
    setIsMember(false);
    setRequests(false);
  };
  const membersHandler = () => {
    setIsMember(true);
    setIsNews(false);
    setRequests(false);
  };
  const requestHandler = () => {
    setRequests(true);
    setIsNews(false);
    setIsMember(false);
  };

  useEffect(() => {
    getNews();
    dispatch(getCommunityById(id));
  }, [dispatch, id]);

  const deleteCommunityHandler = (id) => {
    dispatch(deleteCommunity(id)).then(() => {
      navigate("/communities");
    });
  };
  const [createNews, setCreateNews] = useState(false);
  const handleUpdateAvatar = (file) => {
    dispatch(editEmblem({ file, community, getCommunityById }));
  };
  const getNews = () => {
    dispatch(getAllNews());
  };
  
  if (!community || !news) {
    return "no com";
  }
  
  
  return (
    <div className={styles.community}>
      {communityLoading &&<LoadPreloader/>}
      {community.founder._id === userId._id ? (
        <button onClick={() => setCreateNews(true)}>Добавить новости</button>
        ) : (
          ""
          )}

      {createNews && (
        <CreateNews
        setCreateNews={() => setCreateNews(false)}
        communityId={community}
        />
        )}
      {community.founder._id === userId._id ? (
        <button onClick={() => deleteCommunityHandler(community._id)}>x</button>
        ) : (
          ""
          )}

      <div className={styles.header}>
        <div className={styles.pic}>
          <img
            src={`http://localhost:3042/public/${community.emblem} `}
            alt=""
            />
          {community.founder._id === userId._id  && (
            <input
            type="file"
            id="upload"
            
            accept="image/*"
            onChange={(e) => {
              handleUpdateAvatar(e.target.files[0]);
            }}
            />
            )}
        </div>
        {community.founder._id === userId._id && <button onClick={() => setEditProfile(true)}>Изменить</button> }
        {editProfile && <EditProfileCommunity community={community} setEditProfile={setEditProfile} getCommunityById={getCommunityById}/>}
        
        <div className={styles.info}>
          <div>Название: {community.name}</div>
          <div>Учасники: {community.members.length}</div>
          <div>Рейтинг: {community.rating.length}</div>
          <div>Описание: {community.description}</div>
          <div className="founder">
            <img
              className={styles.image}
              src={`http://localhost:3042/public/${community.founder.avatar}`}
              alt=""
              />
            <div>Основатель: {community.founder.name}</div>
          </div>
        </div>
      </div>
      <div className={styles.routes}>
        <div onClick={newsHandler}>Новости</div>
        <div onClick={membersHandler}>Участники</div>
        <div onClick={requestHandler}>Заявки</div>
      </div>
      <div>
        {isMember &&
          community.members.map((elem) => {
            return <Members members={elem} key={elem._id}/>;
          })}

        {isNews &&
          communityNews.map((news) => {
            return (
              <News
              key={news._id}
                idNews={news._id}
                news={news}
                communityFounderId={community.founder._id}
                userId={userId}
                getNews={getNews}
              />
            );
          })}
        {requests &&
          community.requests.map((elem) => {
            return (
              <Requests
               key={elem._id}
                communityId={community._id}
                requests={elem}
                communityFounderId={community.founder._id}
                userId={userId}
                getCommunityById={getCommunityById}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CommunityById;
