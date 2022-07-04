import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import AllTasks from "./pages/CategoriesPage/AllTasks";
import TasksOnCategories from "./pages/CategoriesPage/TasksOnCategories";
import CategoriesPage from "./pages/CategoriesPage";
import PersonalArea from "./pages/ProfilePage";
import AllCommunities from "./pages/AllCommunityPage";
import CommunityById from "./pages/CommunityPage";
import AllUsersPage from "./pages/AllUsersPage";
import Task from "./pages/TaskPage";
import Friends from "./Friends";
import UserTasks from "./UserTasks";
import Blacklist from "./Blacklist";
import Profile from "./Profile";
import ConfirmPage from "./pages/ConfirmPage";
import FavoritePage from "./pages/FavoritePage";
import Chat from "./chat/Chat";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="container">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/signin"
          element={token ? <Navigate to="/" /> : <SigninPage />}
        />
        <Route path="/" element={<Layout />}>
          <Route path="/categories" element={<CategoriesPage />}>
            <Route index element={<AllTasks />} />
            <Route path="/categories/:id" element={<TasksOnCategories />} />
          </Route>
          <Route path="/profile/:id" element={<PersonalArea />}>
            <Route index element={<Profile />} />
            <Route path="/profile/:id/tasks" element={<UserTasks />} />
            <Route path="/profile/:id/friends" element={<Friends />} />
            <Route path="/profile/:id/blacklist" element={<Blacklist />} />
          </Route>
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<AllUsersPage />} />
          <Route path="/communities" element={<AllCommunities />} />
          <Route path="/communities/:id" element={<CommunityById />} />
          <Route path="/tasks/:id" element={<Task />} />
          <Route path="/confirmations/:id" element={<ConfirmPage />} />
          <Route path="/favorites/:id" element={<FavoritePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
