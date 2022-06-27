import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import AllTasks from "./pages/categoriesPage/AllTasks";
import TasksOnCategories from "./pages/categoriesPage/TasksOnCategories";
import CategoriesPage from "./pages/categoriesPage";
import ProfilePage from "./pages/ProfilePage";
import PersonalData from "./Profile";

const App = () => {
  const token = useSelector((state) => state.token);

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
          <Route path="/profile/:id" element={<ProfilePage />}>
            <Route index element={<PersonalData />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
