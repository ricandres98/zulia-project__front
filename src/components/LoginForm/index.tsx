import React, { FormEventHandler, useContext, useRef, useState } from "react";
import styles from "./styles.module.css";
import { LoginBody, authContext } from "../../hooks/useAuth";
import { useRouter } from "next/router";

const LoginForm = () => {
  const { login, setAdmin } = useContext(authContext);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (form.current !== null) {
      const formData = new FormData(form.current);
      const isAdmin = formData.get("admin");
      const email = formData.get("email");
      const password = formData.get("password");

      if (email && password) {
        setLoading(true);
        setUnauthorized(false);
        const body = {
          email,
          password,
        };
        isAdmin && setAdmin(true);
        const [error, data] = await login(body as LoginBody);
        setLoading(false);

        if (error) {
          setUnauthorized(true);
        } else if (data) {
          router.push(isAdmin ? "/admin/home/" : "/user/home/");
        }
      }
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

        {unauthorized && (
          <p className={styles["unauthorized-message"]}>
            Email o contraseña incorrectos
          </p>
        )}

        {loading && <p className={styles["loading-message"]}>Cargando...</p>}

        <button>Ingresar</button>
      </form>
    </>
  );
};

export { LoginForm };
