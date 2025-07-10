import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
      <p>Don't have an account? <a href="/register">Register here</a></p>

    </div>
  );
};

export default LoginPage;
