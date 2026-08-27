import React, { FormEventHandler, useRef, useState } from "react";
import { InputPassword } from "../InputPassword";
import styles from "./styles.module.css";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";
import { api } from "../../utils/fetchFunc";

type SignupPswInputInputPropsType = {
  setStage: () => void;
};

const SignupPswInput: React.FC<SignupPswInputInputPropsType> = ({ setStage }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { ownerInfo } = useSignUpInfo();
  
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = async (e) => {
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
        const { email, apartmentId} = ownerInfo;
        const [error, response] = await api.users.createUser({
          email: email as string,
          password: password as string,
          apartmentId: apartmentId as number,
          role: "user"
        })
        setLoading(false);
        if (error) {
          setError(error.message);
        } else {
          console.log("Usuario creado", response);
          setError("");
          setStage();
        }
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
