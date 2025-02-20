import React, { FormEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";

type SignupEmailVerificationInputPropsType = {};

const SignupEmailVerificationInput: React.FC<
  SignupEmailVerificationInputPropsType
> = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.current !== null) {}
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={styles["registry-step-3"]}
      ref={form}
    >
      <div>
        <label htmlFor="email">Introduzca su correo electrónico</label>
        <input type="email" id="email" required={true} />
      </div>
      {loading && <LoadingMessage />}
      {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
      <button>Verificar</button>
    </form>
  );
};

export { SignupEmailVerificationInput };
