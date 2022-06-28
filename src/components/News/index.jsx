import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommunityById } from "../../features/communitySlice";

const News = ({ news }) => {
  
  return (
    <div className="news">
      <div>{news.title}</div>
      <div>{news.text}</div>
      <div> Лайки: {news.likes.length}</div>
      <div> Дизлайки: {news.dislikes.length}</div>
    </div>
  );
};
export default News;
