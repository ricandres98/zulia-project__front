import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

const UserInfoContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles["user-info-container"]}>{children}</div>;
};

export { UserInfoContainer };
