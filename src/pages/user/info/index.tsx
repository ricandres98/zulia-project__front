import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { UserInfoField } from "../../../components/UserInfoField";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { UserInfoContainer } from "../../../containers/UserInfoContainer";
import { UserData } from "../../../types/userTypes";
import styles from "./styles.module.css";
import { api } from "../../../utils/fetchFunc";
import { ApartmentType } from "../../../types/apartmentTypes";
import { useTokenFetch } from "../../../hooks/useTokenFetch";
import { FullScreenLoader } from "../../../components/FullScreenLoader";
import { ErrorScreen } from "../../../components/ErrorScreen";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState<ApartmentType | null>(null);

  const { loading, error } = useTokenFetch({
    setInfo: setUserInfo,
    callback: api.apartments.getApartmentByToken,
  });

  return (
    <>
      <AuthorizationContainer>
        {loading && <FullScreenLoader />}
        <Header />
        {error ? (
          <ErrorScreen />
        ) : (
          <main className={styles["main-container"]}>
            <h2>Datos del usuario</h2>
            <UserInfoContainer>
              {userInfo &&
                formatUserInfo(userInfo).map((item) => (
                  <UserInfoField
                    key={item.field}
                    field={item.field}
                    value={item.value}
                    editable={item.editable}
                    name={item.name}
                    setUserInfo={setUserInfo}
                  />
                ))}
            </UserInfoContainer>
          </main>
        )}
      </AuthorizationContainer>
    </>
  );
};

const formatUserInfo = (data: ApartmentType): UserData[] => [
  {
    field: "Nombre",
    name: "firstName",
    value: `${data.owner.firstName}`,
    editable: true,
  },
  {
    field: "Segundo nombre",
    name: "middleName",
    value: `${data.owner.middleName}`,
    editable: true,
  },
  {
    field: "Apellido",
    name: "lastName",
    value: `${data.owner.lastName}`,
    editable: true,
  },
  {
    field: "Segundo apellido",
    name: "secondLastName",
    value: `${data.owner.secondLastName ?? ""}`,
    editable: true,
  },
  {
    field: "Apartamento",
    name: "apartmentNumber",
    value: data.apartmentNumber,
    editable: false,
  },
];

export default UserPage;
