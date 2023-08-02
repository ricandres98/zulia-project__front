import React from "react";
import { Header } from "../components/Header";
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <div>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
