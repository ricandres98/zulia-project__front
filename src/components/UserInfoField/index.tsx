import { PencilIcon } from "../../Icons/PencilIcon";
import { UserData } from "../../types/userTypes";
import styles from "./styles.module.css";

const UserInfoField = ({ field, value, editable }: UserData) => {
  return (
    <div className={styles["user-info-field"]}>
      <div className={styles["user-info-field__data"]}>
        <span className={styles.field}>{field}</span>
        <span className={styles.value}>{value || "********"}</span>
      </div>
      {!!editable && (
        <button>
          <PencilIcon />
        </button>
      )}
    </div>
  );
};

export { UserInfoField };
