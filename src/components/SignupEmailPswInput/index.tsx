import React, { FormEventHandler } from "react";
import styles from "./styles.module.css";

type SignupEmailPswInputPropsType = {};

const SignupEmailPswInput: React.FC<SignupEmailPswInputPropsType> = () => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className={styles["registry-step-3"]}>
      <div>
        <label htmlFor="email">Introduzca su correo electrónico</label>
        <input type="email" id="email" />
        <label htmlFor="password">Introduzca una contraseña</label>
        <input type="password" id="password" />
        <label htmlFor="verify-password">Confirme su contraseña</label>
        <input type="password" id="verify-password" />
      </div>
      <button>Next</button>
    </form>
  );
};

export { SignupEmailPswInput };
