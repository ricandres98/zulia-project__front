import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useSignUpInfo } from "../../hooks/useSignUpInfo";
import { api } from "../../utils/fetchFunc";
import { LoadingMessage } from "../LoadingMessage";
import { ErrorMessage } from "../ErrorMessage";

type SignupOwnerDataInputPropsType = {
  // eslint-disable-next-line no-unused-vars
  setStage: () => void;
  stage: number;
};

const SignupOwnerDataInput: React.FC<SignupOwnerDataInputPropsType> = ({
  setStage,
  stage,
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const { ownerInfo, setOwnerInfoAndUpdateTime } = useSignUpInfo();

  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    (async () => {
      if (ownerInfo.personId) {
        const [reqError, ownerExists] = await api.owners.checkOwnerExists(
          `${ownerInfo.personId}`,
        );
        if (reqError) {
          console.log(reqError);
        } else if (ownerExists) {
          setEditable(false);
        }
      }
    })();
  }, [ownerInfo]);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (form.current !== null) {
      const formData = new FormData(form.current);
      const firstName = formData.get("first-name");
      const middleName = formData.get("middle-name");
      const lastName = formData.get("last-name");
      const secondLastName = formData.get("second-last-name");

      let newOwnerInfo = {
        firstName: firstName as string,
        lastName: lastName as string,
      };

      if (middleName) {
        Object.defineProperty(newOwnerInfo, "middleName", {
          value: middleName as string,
          enumerable: true,
        });
      }

      if (secondLastName) {
        Object.defineProperty(newOwnerInfo, "secondLastName", {
          value: secondLastName as string,
          enumerable: true,
        });
      }

      setOwnerInfoAndUpdateTime({
        ...ownerInfo,
        ...newOwnerInfo,
      });

      const body = {
        ...newOwnerInfo,
        personId: ownerInfo.personId!,
      };

      try {
        const [reqError, ownerExists] = await api.owners.checkOwnerExists(
          `${ownerInfo.personId}`,
        );
        if (reqError) {
          throw reqError;
        } else if (ownerExists) {
          // If the owner already exists in the database just move on to next stage
          const [err, data] = await api.owners.getOwnerByPersonId(
            `${ownerInfo.personId}`,
          );
          if (err) {
            throw err;
          } else {
            setOwnerInfoAndUpdateTime({
              ...ownerInfo,
              ownerId: data.id,
            });
          }
          setStage();
        } else {
          const [err, data] = await api.owners.createOwner(body);
          if (err) {
            throw err;
          } else {
            console.log(data);
            setOwnerInfoAndUpdateTime({
              ...ownerInfo,
              ownerId: data.id,
            });
            console.log("Usuario creado con éxito, siguiente etapa");
            setStage();
          }
        }
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className={styles["registry-step-3"]}
    >
      <div>
        <label htmlFor="first-name">* Nombre: </label>
        <input
          type="text"
          id="first-name"
          name="first-name"
          defaultValue={ownerInfo?.firstName}
          readOnly={!editable || stage !== 2}
          required={true}
        />
        <label htmlFor="middle-name">Segundo nombre: </label>
        <input
          type="text"
          id="middle-name"
          name="middle-name"
          defaultValue={ownerInfo.middleName || ""}
          readOnly={!editable || stage !== 2}
        />
        <label htmlFor="last-name">* Apellido: </label>
        <input
          type="text"
          id="last-name"
          name="last-name"
          defaultValue={ownerInfo.lastName}
          readOnly={!editable || stage !== 2}
          required={true}
        />
        <label htmlFor="second-last-name">Segundo apellido: </label>
        <input
          type="text"
          id="second-last-name"
          name="second-last-name"
          defaultValue={ownerInfo.secondLastName || ""}
          readOnly={!editable || stage !== 2}
        />
      </div>
      {loading && <LoadingMessage />}
      {!loading && error && <ErrorMessage>{error}</ErrorMessage>}
      <button>Guardar</button>
    </form>
  );
};

export { SignupOwnerDataInput };
