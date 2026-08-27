import React from "react";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

const Message = ({ children }: Props) => {
  return <p className={styles.message}>{children}</p>;
};

export { Message };
