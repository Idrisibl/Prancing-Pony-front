import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, deleteLikes, getAllNews } from "../../features/newsSlice";
import styles from "./News.module.css";
const News = ({ news }) => {
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const getNews = () => {
    dispatch(getAllNews())
  }
  useEffect(() => {
    getNews();
  }, [dispatch]);

  const likesHandler = (arr) =>{
    arr.find((elem) => elem === userId._id)
    ? dispatch(
        deleteLikes({ userId, news, callback: getNews })
      )
    : dispatch(
        addLikes({ userId, news, callback: getNews })
      );
  }
  
  return (
    <div className={styles.news}>
      <div>{news.title}</div>
      <div>{news.text}</div>
      <button onClick={()=>likesHandler(news.likes)}> Лайки: </button>
      {news.likes.length}
    </div>
  );
};
export default News;
