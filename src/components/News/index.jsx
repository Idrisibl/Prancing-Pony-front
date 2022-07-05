import { useDispatch } from "react-redux";
import { addLikes, deleteLikes, deleteNews } from "../../features/newsSlice";
import styles from "./News.module.css";
import { GrLike } from "react-icons/gr";

const News = ({ news, idNews, userId, communityFounderId, getNews }) => {
  const dispatch = useDispatch();

  const deleteNewsHandler = (id) => {
    dispatch(deleteNews({ id, callback: getNews }));
  };
  const likesHandler = (arr) => {
    arr.find((elem) => elem === userId._id)
      ? dispatch(deleteLikes({ userId, news, callback: getNews }))
      : dispatch(addLikes({ userId, news, callback: getNews }));
  };

  return (
    <div className={styles.news}>
      <div className={styles.removeBtn}>
        {communityFounderId === userId._id ? (
          <button onClick={() => deleteNewsHandler(idNews)}>X</button>
        ) : (
          ""
        )}
      </div>
      <div className={styles.title}>{news.title}</div>
      <div className={styles.text}>{news.text}</div>
      <div className={styles.image}>
        <img src={`http://localhost:3042/public/${news.image}`} alt="" />
      </div>
      <div className={styles.likes}>
        <GrLike cursor="pointer" onClick={() => likesHandler(news.likes)} />
        <span>{news.likes.length}</span>
      </div>
    </div>
  );
};
export default News;
