import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ReceiptsTable } from "../../components/ReceiptsTable";
import { AuthorizationContainer } from "../../containers/AuthorizationContainer";
import { FullScreenLoader } from "../../components/FullScreenLoader";
// import { useRouter } from "next/router";
import { api } from "../../utils/fetchFunc";
import { ErrorScreen } from "../../components/ErrorScreen";
import styles from "../../styles/Home.module.css";
import { ApartmentType } from "../../types/apartmentTypes";
import { authContext } from "../../hooks/useAuth";

export default function Home() {
  const { userToken } = useContext(authContext);
  const [apartment, setApartment] = useState<ApartmentType>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [err, data] = await api.apartments.getApartmentByToken(
        userToken as string,
      );
      setLoading(false);
      if (!err) {
        console.log(data);
        setApartment(data);
      } else {
        setError(true);
        console.error(err);
      }
    })();
  }, [userToken]);

  return (
    <>
      <AuthorizationContainer>
        {loading && <FullScreenLoader />}
        <Header />
        {error ? (
          <ErrorScreen />
        ) : (
          <main className={styles["main-container"]}>
            <h2>Apartamento {apartment?.apartmentNumber}</h2>
            <ReceiptsTable />
          </main>
        )}
      </AuthorizationContainer>
    </>
  );
}
