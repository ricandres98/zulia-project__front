import { useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { authContext } from "../../hooks/useAuth";

const FullScreenLoader = () => {
  const { firstLoad, setFirstLoad } = useContext(authContext);

  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        setFirstLoad(false);
      }, 2000);
    }
  }, []);

  if (firstLoad) {
    return (
      <div className={styles.fullscreen}>
        <div className={styles.container}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    );
  } else return <></>;
};

export { FullScreenLoader };
