import React, { FormEventHandler } from "react";
import styles from "./styles.module.css";

type SignupOwnerDataInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
};

const SignupOwnerDataInput: React.FC<SignupOwnerDataInputPropsType> = ({
  setStage,
}) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setStage();
  };

  return (
    <form onSubmit={handleSubmit} className={styles["registry-step-3"]}>
      <div>
        <label htmlFor="first-name">* Nombre: </label>
        <input type="text" id="first-name" />
        <label htmlFor="middle-name">Segundo nombre: </label>
        <input type="text" id="middle-name" />
        <label htmlFor="last-name">* Apellido: </label>
        <input type="text" id="last-name" />
        <label htmlFor="second-last-name">Segundo apellido: </label>
        <input type="text" id="second-last-name" />
      </div>
      <button>Next stage</button>
    </form>
  );
};

export { SignupOwnerDataInput };
