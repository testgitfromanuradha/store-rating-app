import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "user") navigate("/user");
if (role === "owner") navigate("/owner");

      if (role === "admin") navigate("/admin");
      else if (role === "owner") navigate("/owner");
      else navigate("/user");

    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
