import React from "react";
import { Header } from "../../components/Header";
import { LoginForm } from "../../components/LoginForm";
import styles from "./styles.module.css";

const Login = () => {
  return (
    <div className={styles["super-grid"]}>
      <Header className={styles.header} />
      {/* <div className={styles["grid-container"]}> */}
      <div className={styles["login-image-container"]}></div>
      <div className={styles["login-container"]}>
        <LoginForm />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
