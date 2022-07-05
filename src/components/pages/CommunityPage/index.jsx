import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllNews } from "../../../features/newsSlice";
import {
  addRating,
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
import { FaRegEdit } from "react-icons/fa";

const CommunityById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const news = useSelector((state) => state.newsReducer.news);
  const { id } = useParams();

  const communityNews = news.filter((elem) => elem.community === id);

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
  const [editProfile, setEditProfile] = useState(false);

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

  useEffect(() => {
    getNews();
    dispatch(getCommunityById(id));
  }, [dispatch, id]);

  if (!community || !news) {
    return "no com";
  }

  return (
    <div className={styles.community}>
      {communityLoading && <LoadPreloader />}
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
          {community.founder._id === userId._id && (
            <div className={styles.editor}>
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={(e) => {
                  handleUpdateAvatar(e.target.files[0]);
                }}
              />
              <label htmlFor="upload">
                <FaRegEdit size="3rem" />
              </label>
            </div>
          )}
        </div>
        {editProfile && (
          <EditProfileCommunity
            community={community}
            setEditProfile={setEditProfile}
            getCommunityById={getCommunityById}
          />
        )}

        <div className={styles.info}>
          <div className={styles.title}>
            <strong>Название:</strong>
            <span>{community.name} </span>
            {community.founder._id === userId._id && (
              <FaRegEdit
                onClick={() => setEditProfile(true)}
                cursor="pointer"
                size="2.5rem"
                fill="rgba(0, 0, 0, 0.5)"
              />
            )}
          </div>
          <div className={styles.members}>
            <strong>Участники: </strong>
            <span>{community.members.length}</span>
          </div>

          <div className={styles.desc}>
            <strong>Описание: </strong>
            <span>{community.description}</span>
          </div>
          <div className={styles.founder}>
            <img
              className={styles.image}
              src={`http://localhost:3042/${community.founder.avatar}`}
              alt=""
            />
            <span>{community.founder.name} </span>
            <span>{community.founder.lastname}</span>
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
            return (
              <Members
                members={elem}
                key={elem._id}
                founder={community.founder}
                community={community}
              />
            );
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
