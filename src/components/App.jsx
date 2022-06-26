import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import CategoriesPage from "./pages/categoriesPage";
import AllTasks from "./pages/categoriesPage/AllTasks";
import TasksOnCategories from "./pages/categoriesPage/TasksOnCategories";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/categories" element={<CategoriesPage />}>
          <Route index element={<AllTasks />} />
          <Route path="/categories/:id" element={<TasksOnCategories />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
