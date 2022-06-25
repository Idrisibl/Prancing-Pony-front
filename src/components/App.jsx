import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./Layout";

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
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
