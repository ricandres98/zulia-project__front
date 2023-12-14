import React, { FormEventHandler, useContext, useRef } from "react";
import styles from "./styles.module.css";
import { authContext } from "../../hooks/useAuth";
import { useRouter } from "next/router";

const LoginForm = () => {
  const { login, setAdmin } = useContext(authContext);
  const router = useRouter();

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (form.current !== null) {
      const formData = new FormData(form.current);
      const isAdmin = formData.get("admin");

      isAdmin && setAdmin(true);
      login();
      router.push(isAdmin ? "/admin/home/1" : "/user/home/1");
    }
  };

  return (
    <>
      <form
        ref={form}
        onSubmit={(e) => handleSubmit(e)}
        className={styles["form-container"]}
      >
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" name="password" />

        <label htmlFor="admin" className={styles["admin-label"]}>
          <input type="checkbox" name="admin" id="admin" />
          <span>Ingresar como administrador</span>
        </label>

        <button>Ingresar</button>
      </form>
    </>
  );
};

export { LoginForm };
