import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "../../../features/authSlice";
import LoadPreloader from "../../LoadPreloader";
import TasksItems from "../../TasksItems";

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.auth.authUser.favourites);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  if (!favourites || !favourites.length) {
    return "пусто";
  }

  return (
    <div>
      {loading ? (
        <LoadPreloader />
      ) : (
        favourites.map((item) => {
          return (
            <TasksItems key={item._id} task={item} favourites={favourites} />
          );
        })
      )}
    </div>
  );
};

export default Favourites;
