import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import OwnerPage from "./pages/OwnerPage";
import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/owner" element={<OwnerPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
