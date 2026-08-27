import React, { useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import { LoginForm } from "../../components/LoginForm";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { authContext } from "../../hooks/useAuth";

const Login = () => {
  const router = useRouter();
  const { isAuth } = useContext(authContext);

  // if user is authenticated login page is blocked
  // and redirects to home.
  useEffect(() => {
    if (router.isReady) {
      if (isAuth) {
        router.push("/");
      }
    }
  }, [router, isAuth]);

  return (
    <div className={styles["super-grid"]}>
      <Header className={styles.header} />
      <div className={styles["login-image-container"]}></div>
      <div className={styles["login-container"]}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
