import type React from "react";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return <p className={styles["unauthorized-message"]}>{children}</p>;
};

export { ErrorMessage };
