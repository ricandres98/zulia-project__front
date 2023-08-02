import React, { FormEventHandler } from "react";
import styles from "./styles.module.css";

const LoginForm = () => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
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
