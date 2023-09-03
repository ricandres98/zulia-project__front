import { FormEventHandler, useState } from "react";
import { PencilIcon } from "../../Icons/PencilIcon";
import { UserData } from "../../types/userTypes";
import styles from "./styles.module.css";
import { XMarkIcon } from "../../Icons/XMarkIcon";
import { CheckIcon } from "../../Icons/CheckIcon";

const UserInfoField = ({ field, value, editable }: UserData) => {
  const [editing, setEditing] = useState(false);

  const handleSubmitEditing: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles["user-info-field"]}>
      <div className={styles["user-info-field__data"]}>
        <span className={styles.field}>{field}</span>
        {editing ? (
          <form onSubmit={handleSubmitEditing} className={styles["edit-form"]}>
            <input type="text" />
            <button>
              <CheckIcon color="green" />
            </button>
          </form>
        ) : (
          <span className={styles.value}>{value || "********"}</span>
        )}
      </div>
      {!!editable && (
        <>
          {!editing ? (
            <button onClick={() => setEditing(true)}>
              <PencilIcon />
            </button>
          ) : (
            <button onClick={() => setEditing(false)}>
              <XMarkIcon color="green" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export { UserInfoField };
