import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLikes, deleteLikes, deleteNews } from "../../features/newsSlice";
import styles from "./News.module.css";
const News = ({ news, idNews, userId, communityFounderId, getNews }) => {
  const dispatch = useDispatch()
  
  const deleteNewsHandler = (id) => {
    dispatch(deleteNews({id, callback: getNews}))
  }
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
      {communityFounderId === userId._id ? <button onClick={()=>deleteNewsHandler(idNews)}>xNews</button> : ""}
      <div>{news.title}</div>
      <div>{news.text}</div>
      <button onClick={()=>likesHandler(news.likes)}> Лайки: </button>
      {news.likes.length}
      <img src={`http://localhost:3042/public/${news.image}`} alt="" />
    </div>
  );
};
export default News;
