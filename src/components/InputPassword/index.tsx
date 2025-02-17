import React, { useState } from "react";
import { EyeIcon } from "../../Icons/EyeIcon";
import styles from "./styles.module.css";

type PropTypes = {
  id: string;
  text: string;
};

const InputPassword: React.FC<PropTypes> = ({ id, text }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <label htmlFor={id}>{text}</label>
      <div
        className={`${styles["input-with-button"]} ${styles["inferior-level-component"]}`}
      >
        <input
          type={visible ? "text" : "password"}
          id={id}
          name={id}
          required={true}
        />

        <button
          className={styles.toggle}
          onMouseDown={() => setVisible(true)}
          onMouseUp={() => setVisible(false)}
          type="button"
        >
          <EyeIcon />
        </button>
      </div>
    </>
  );
};

export { InputPassword };
