import styles from "./News.module.css";

const News = ({ news }) => {
  return (
    <div className={styles.news}>
      <div>{news.title}</div>
      <div>{news.text}</div>
      <div> Лайки: {news.likes.length}</div>
      <div> Дизлайки: {news.dislikes.length}</div>
    </div>
  );
};
export default News;
