import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useDispatch } from "react-redux";
import {
  addCommunity,
  editEmblem,
  getAllCommunities,
} from "../../../features/communitySlice";
import styles from "../../AddTaskModal/Modal.module.css";

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
    <div className={styles.wrapper}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.close}>
            <button onClick={() => setIsCreated(false)}>X</button>
          </div>
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
              placeholder="Название"
            />
            <input
              type="text"
              value={description}
              onChange={descriptionHandler}
              placeholder="Описание..."
            />

            <div className={styles.addBtn}>
              <button type="submit">
                <GiCheckMark size="3rem" fill="green" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
