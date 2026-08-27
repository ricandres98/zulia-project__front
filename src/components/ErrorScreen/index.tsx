import Image from "next/image";
import error from "../../assets/error2.png";
import styles from "./styles.module.css";

const ErrorScreen = () => {
  return (
    <div className={styles["error-container"]}>
      <Image src={error} alt="Error image" width={300} height={300} />
      <p>¡Ups! Al parecer ha habido un error.</p>
    </div>
  );
};

export { ErrorScreen };
