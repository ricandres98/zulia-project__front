import React, { FormEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";
import { api } from "../../utils/fetchFunc";

type SignupApartmentInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
  apartmentsArray: string[];
  stage: number;
};

const SignupApartmentInput: React.FC<SignupApartmentInputPropsType> = ({
  setStage,
  apartmentsArray,
  stage,
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);

  const { ownerInfo, setOwnerInfoAndUpdateTime } = useSignUpInfo();


  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.current !== null) {
      const formData = new FormData(form.current);
      const apartment = formData.get("apartment");

      const newApartmentInfo = {
        apartmentNumber: apartment as string,
        ownerId: ownerInfo.ownerId,
        aliquot: apartment === "LOC" ? 9.6568 : 3.7643,
      };

      console.log(newApartmentInfo);

      // TO DO: create method for creating apartments
      // api.apartments.
    }

    setStage();
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className={styles["registry-step-2"]}
    >
      <div>
        <label htmlFor="apartment">Seleccione el apartamento:</label>
        <select
          name="apartment"
          id="apartment"
          // TO DO: make uneditable after saving
          aria-readonly={!editable || stage != 3}
        >
          {apartmentsArray.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button>Guardar</button>
    </form>
  );
};

export { SignupApartmentInput };
