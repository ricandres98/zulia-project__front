import React, { FormEventHandler, useRef, useState } from "react";
import { PencilIcon } from "../../Icons/PencilIcon";
import { UserData } from "../../types/userTypes";
import styles from "./styles.module.css";
import { XMarkIcon } from "../../Icons/XMarkIcon";
import { CheckIcon } from "../../Icons/CheckIcon";
import { api } from "../../utils/fetchFunc";
import { authContext } from "../../hooks/useAuth";
import { ApartmentType } from "../../types/apartmentTypes";

interface PropsType extends UserData {
  setUserInfo: React.Dispatch<React.SetStateAction<ApartmentType | null>>;
}

const UserInfoField = ({
  field,
  value,
  editable,
  name,
  setUserInfo,
}: PropsType) => {
  const [editing, setEditing] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { userToken } = React.useContext(authContext);

  const handleSubmitEditing: FormEventHandler = async (e) => {
    e.preventDefault();
    if (form.current !== null) {
      const formData = new FormData(form.current);
      const newData = formData.get(name);
      const body = {
        [name]: newData,
      };
      if (newData) {
        const [error, owner] = await api.owners.updateOwner(
          /*Owner ID must be read dynamically */
          1,
          body,
          userToken as string,
        );
        if (!error) {
          setUserInfo((prevValue: ApartmentType | null): ApartmentType => {
            return {
              ...prevValue!,
              owner: owner,
            };
          });
          setEditing(false);
        }
      }
    }
  };

  return (
    <div className={styles["user-info-field"]}>
      <div className={styles["user-info-field__data"]}>
        <span className={styles.field}>{field}</span>
        {editing ? (
          <form
            ref={form}
            onSubmit={handleSubmitEditing}
            className={styles["edit-form"]}
          >
            <input type="text" name={name} />
            <button>
              <CheckIcon color="green" />
            </button>
          </form>
        ) : (
          <span className={styles.value}>{value}</span>
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
