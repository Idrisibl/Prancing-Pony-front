import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCommunity,
  editEmblem,
  getAllCommunities,
} from "../../../features/communitySlice";

const CreateCommunity = ({ setIsCreated }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [emblem, setEmblem] = useState("");
  const [description, setDescription] = useState("");

  const communitiesAllFunction = () => {
    dispatch(getAllCommunities());
  };
  useEffect(() => {
    communitiesAllFunction();
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCommunity({
        name,
        description,
        emblem,
        callback: communitiesAllFunction,
      })
    );
    setName("");
    setDescription("");
    setIsCreated(false);
  };
  const uploadHandler = (e) => {
    e.preventDefault();
    setEmblem(e.target.files[0]);
  };
  const textHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const descriptionHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const handleUpdateAvatar = (file) => {
    dispatch(editEmblem({ file }));
  };


  return (
    <div>
      <button onClick={() => setIsCreated(false)}>x</button>
      <form onSubmit={submitHandler}>
        <input
          type="file"
          id="upload"
          accept="image/*"
          onChange={uploadHandler}
        />
        <input
          type="text"
          value={name}
          onChange={textHandler}
          placeholder="name"
        />
        <input
          type="text"
          value={description}
          onChange={descriptionHandler}
          placeholder="descr"
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateCommunity;
