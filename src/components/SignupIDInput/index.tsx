import React, { FormEventHandler } from "react";
import styles from "./styles.module.css";

type SignupIDInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
};

const SignupIDInput: React.FC<SignupIDInputPropsType> = ({ setStage }) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setStage();
  };

  return (
    <form onSubmit={handleSubmit} className={styles["registry-step-1"]}>
      <div>
        <label htmlFor="cedula">Cédula de identidad:</label>
        <input type="number" name="owner_id" id="cedula" />
      </div>
      <button>Next stage</button>
    </form>
  );
};

export { SignupIDInput };
