import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { UserInfoField } from "../../../components/UserInfoField";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { UserInfoContainer } from "../../../containers/UserInfoContainer";
import { UserData } from "../../../types/userTypes";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { api } from "../../../utils/fetchFunc";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState<UserData[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { id } = router.query;
        const [err, data] = await api.apartments.getApartmentById(id as string);
        if (!err) {
          setUserInfo(formatUserInfo(data));
        } else {
          console.error(err);
        }
      }
    })();
  }, [router]);

  return (
    <>
      <AuthorizationContainer>
        <Header />
        <main className={styles["main-container"]}>
          <h2>Datos del usuario</h2>
          <UserInfoContainer>
            {userInfo.map((item) => (
              <UserInfoField
                key={item.field}
                field={item.field}
                value={item.value}
                editable={item.editable}
              />
            ))}
          </UserInfoContainer>
        </main>
      </AuthorizationContainer>
    </>
  );
};

const formatUserInfo = (data: {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  apartment: string;
  residence: string;
}): UserData[] => [
  {
    field: "Nombre propietario",
    value: `${data.firstName} ${data.lastName}`,
    editable: true,
  },
  {
    field: "Correo electrónico",
    value: data.email,
    editable: false,
  },
  {
    field: "Contraseña",
    value: undefined,
    editable: true,
  },
  {
    field: "Apartamento",
    value: data.apartment,
    editable: false,
  },
];

export default UserPage;
