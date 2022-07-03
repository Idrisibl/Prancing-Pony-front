import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNews, getAllNews } from "../../../features/newsSlice";

const CreateNews = ({communityId, setCreateNews}) => {
    const [image, setImage] = useState()
    const [title, setTitle] = useState()
    const [text, setText] = useState()
    const dispatch = useDispatch()
    const allNews = () => {
        dispatch(getAllNews());
      };
      useEffect(() => {
        allNews();
      }, [dispatch]);
      
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          addNews({
            community: communityId._id,
            title,
            image,
            text,
            callback: allNews,
          })
        );
        setTitle("");
        setText("");
        setCreateNews(false);
      };

      const uploadHandler = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
      };
      
      const titleHandler = (e) =>{
        e.preventDefault()
        setTitle(e.target.value)
      }
      
      const textHandler = (e) => {
        e.preventDefault()
        setText(e.target.value)
      }

    return (
    <div>
      <button onClick={() => setCreateNews(false)}>x</button>
      <form onSubmit={submitHandler}>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={uploadHandler}
        />
        <input
          type="text"
          value={title}
          onChange={titleHandler}
          placeholder="name"
        />
        <input
          type="text"
          value={text}
          onChange={textHandler}
          placeholder="descr"
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateNews
