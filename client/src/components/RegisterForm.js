import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const { name, email, password, address } = form;

    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 to 60 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Invalid email format.";
    }

    if (address.length > 400) {
      return "Address must be less than 400 characters.";
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;
    if (!passwordPattern.test(password)) {
      return "Password must be 8–16 chars, 1 uppercase, 1 special char.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
