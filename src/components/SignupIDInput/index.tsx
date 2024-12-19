import React, { FormEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { api } from "../../utils/fetchFunc";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingMessage } from "../LoadingMessage";

type SignupIDInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
};

const SignupIDInput: React.FC<SignupIDInputPropsType> = ({ setStage }) => {
  // const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { ownerInfo, setOwnerInfoAndUpdateTime } = useSignUpInfo();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (inputRef.current) {
      const id = inputRef.current.value;

      if (id) {
        setLoading(true);
        const [reqError, itExists] = await api.owners.checkOwnerExists(id);
        console.log([reqError, itExists]);

        if (reqError) {
          setLoading(false);
          setError(reqError.message);
        } else {
          setError("");
          if (itExists) {
            console.log("Usuario existente");
            const ownerInDB = await api.owners.getOwnerByPersonId(id);
            console.log(ownerInDB);
            setOwnerInfoAndUpdateTime({
              ...ownerInfo,
              firstName: ownerInDB[1]?.firstName,
              middleName: ownerInDB[1]?.middleName,
              lastName: ownerInDB[1]?.lastName,
              secondLastName: ownerInDB[1]?.secondLastName,
              personId: ownerInDB[1]?.personId,
            });
          } else {
            console.log("Usuario no registrado. Ingrese datos");
            setOwnerInfoAndUpdateTime({
              personId: parseInt(id),
            });
          }
          setLoading(false);
          setStage();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["registry-step-1"]}>
      <div>
        <label htmlFor="cedula">Cédula de identidad:</label>
        <input
          type="number"
          name="owner_id"
          id="cedula"
          ref={inputRef}
          // value={id}
          // onChange={(e) => setId(e.target.value)}
          defaultValue={ownerInfo?.personId}
        />
      </div>
      {loading && <LoadingMessage />}
      {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
      <button>Next stage</button>
    </form>
  );
};

export { SignupIDInput };
