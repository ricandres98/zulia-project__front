import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { UserInfoField } from "../../../components/UserInfoField";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { UserInfoContainer } from "../../../containers/UserInfoContainer";
import { UserData } from "../../../types/userTypes";
import styles from "./styles.module.css";
import { api } from "../../../utils/fetchFunc";
import { authContext } from "../../../hooks/useAuth";
import { ApartmentType } from "../../../types/apartmentTypes";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState<ApartmentType | null>(null);
  const { userToken } = React.useContext(authContext);

  useEffect(() => {
    (async () => {
      const [err, data] = await api.apartments.getApartmentByToken(
        userToken as string,
      );
      if (!err) {
        setUserInfo(data as ApartmentType);
      } else {
        console.error(err);
      }
    })();
  }, [userToken]);

  return (
    <>
      <AuthorizationContainer>
        <Header />
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
