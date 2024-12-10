import React, { FormEventHandler } from "react";
import styles from "./styles.module.css";

type SignupApartmentInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
  apartmentsArray: string[];
};

const SignupApartmentInput: React.FC<SignupApartmentInputPropsType> = ({
  setStage,
  apartmentsArray,
}) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setStage();
  };

  return (
    <form onSubmit={handleSubmit} className={styles["registry-step-2"]}>
      <div>
        <label htmlFor="apartment">Seleccione el apartamento:</label>
        <select name="apartment" id="apartment">
          {apartmentsArray.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button>Next stage</button>
    </form>
  );
};

export { SignupApartmentInput };
