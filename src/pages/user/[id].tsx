import { Header } from "../../components/Header";
import { UserInfoField } from "../../components/UserInfoField";
import { AuthorizationContainer } from "../../containers/AuthorizationContainer";
import { UserInfoContainer } from "../../containers/UserInfoContainer";
import { UserData } from "../../types/userTypes";
import styles from "./styles.module.css";

const userPage = () => {
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

const userInfo: UserData[] = [
  {
    field: "Nombre propietario",
    value: "Ricardo Ojeda",
    editable: true,
  },
  {
    field: "Correo electrónico",
    value: "ricardo@mail.com",
    editable: false,
  },
  {
    field: "Contraseña",
    value: undefined,
    editable: true,
  },
  {
    field: "Apartamento",
    value: "9A",
    editable: false,
  },
];

export default userPage;
