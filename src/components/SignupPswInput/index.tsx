import React, { FormEventHandler, useRef, useState } from "react";
import { InputPassword } from "../InputPassword";
import styles from "./styles.module.css";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";

type SignupPswInputInputPropsType = {};

const SignupPswInput: React.FC<SignupPswInputInputPropsType> = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.current !== null) {
      const formData = new FormData(form.current);
      const password = formData.get("password");
      const verifyPassword = formData.get("verify-password");

      if (password !== verifyPassword) {
        setLoading(false);
        setError("La contraseña no coincide en ambos campos");
      } else {
        setLoading(false);
        console.log("Enviado email de verificación");
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={styles["registry-step-3"]}
        ref={form}
      >
        <div>
          <InputPassword text={"Introduzca una contraseña"} id={"password"} />
          <InputPassword text={"Confirme su contraseña"} id={"verify-password"} />
        </div>
        {loading && <LoadingMessage />}
        {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
        <button>Next</button>
      </form>
    </div>
  );
};

export { SignupPswInput };
