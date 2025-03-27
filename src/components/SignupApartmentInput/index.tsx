import React, { FormEventHandler, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";
import { api } from "../../utils/fetchFunc";
import { LoadingMessage } from "../LoadingMessage";
import { ErrorMessage } from "../ErrorMessage";

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

    // const ownerInfo = JSON.parse(
    //   localStorage.getItem("Zulia_V1_create-owner-info")!,
    // );

    console.log(ownerInfo);

    if (form.current !== null) {
      const formData = new FormData(form.current);
      const apartment = formData.get("apartment");

      if (ownerInfo.ownerId) {
        const newApartmentInfo = {
          apartmentNumber: apartment as string,
          ownerId: ownerInfo.ownerId,
          aliquot: apartment === "LOC" ? 9.6568 : 3.7643,
        };

        console.log(newApartmentInfo);

        // TO DO: create method for creating apartments
        // api.apartments.
        try {
          // if the apartment exists returns its ID, else returns false
          const apartmentAlreadyExists =
            await api.apartments.checkApartmentExists(apartment as string);
          console.log("Apartment exists: ", apartmentAlreadyExists);
          if (apartmentAlreadyExists) {
            const apartment = await api.apartments.getApartmentById(
              apartmentAlreadyExists,
            );
            console.log({ ownerInfo });
            if (apartment.ownerId !== ownerInfo.ownerId) {
              throw "Apartamento ya registrado con otro propietario";
            }
            setOwnerInfoAndUpdateTime({
              ...ownerInfo,
              apartmentId: apartmentAlreadyExists,
            });
          } else {
            const newApartment =
              await api.apartments.createApartment(newApartmentInfo);
            setOwnerInfoAndUpdateTime({
              ...ownerInfo,
              apartmentId: newApartment.id,
            });
          }
          setEditable(false);
          setStage();
        } catch (error) {
          setError(error as string);
        }
      } else {
        console.error("ownerId is undefined:", { ownerInfo: ownerInfo });
      }
      setLoading(false);
    }
  };

  return (
    <div>
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
        {loading && <LoadingMessage />}
        {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
        {stage === 3 && <button>Guardar</button>}
      </form>
    </div>
  );
};

export { SignupApartmentInput };
