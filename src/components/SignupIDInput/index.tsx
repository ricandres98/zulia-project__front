import React, { FormEventHandler, useState } from "react";
import styles from "./styles.module.css";
import { api } from "../../utils/fetchFunc";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";

type SignupIDInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
};

const SignupIDInput: React.FC<SignupIDInputPropsType> = ({ setStage }) => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const { ownerInfo, setOwnerInfo } = useSignUpInfo();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (id) {
      const [reqError, itExists] = await api.owners.checkOwnerExists(id);
      console.log([reqError, itExists]);

      if (reqError) {
        setError(reqError.message);
      } else {
        setError("");
        if (itExists) {
          console.log("Usuario existente");
          const ownerInDB = await api.owners.getOwnerByPersonId(id);
          console.log(ownerInDB);
          setOwnerInfo({
            ...ownerInfo,
            firstName: ownerInDB[1]?.firstName,
            middleName: ownerInDB[1]?.middleName,
            lastName: ownerInDB[1]?.lastName,
            secondLastName: ownerInDB[1]?.secondLastName,
            personId: ownerInDB[1]?.personId,
          });
        } else {
          console.log("Usuario no registrado. Ingrese datos");
          setOwnerInfo({
            personId: parseInt(id),
          });
        }
        setStage();
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
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      {error && <p>Ha ocurrido un error</p>}
      <button>Next stage</button>
    </form>
  );
};

export { SignupIDInput };
