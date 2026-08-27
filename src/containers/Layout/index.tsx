import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

const Layout = ({ children }: PropsWithChildren) => {
  return <div className={styles["main-container"]}>{children}</div>;
};

export { Layout };
