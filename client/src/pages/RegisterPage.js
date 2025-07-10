import React from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
      <p>Already registered? <a href="/">Login</a></p>

    </div>
  );
};

export default RegisterPage;
