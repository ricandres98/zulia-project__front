import React, { useState } from "react";
import { Header } from "../../components/Header";
import { ReceiptsTable } from "../../components/ReceiptsTable";
import { AuthorizationContainer } from "../../containers/AuthorizationContainer";
import { FullScreenLoader } from "../../components/FullScreenLoader";
import { api } from "../../utils/fetchFunc";
import { ErrorScreen } from "../../components/ErrorScreen";
import styles from "../../styles/Home.module.css";
import { ApartmentType } from "../../types/apartmentTypes";
import { useTokenFetch } from "../../hooks/useTokenFetch";

export default function Home() {
  const [apartment, setApartment] = useState<ApartmentType>();
  const { error, loading } = useTokenFetch<ApartmentType>({
    setInfo: setApartment,
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
            <h2>Apartamento {apartment?.apartmentNumber}</h2>
            <ReceiptsTable />
          </main>
        )}
      </AuthorizationContainer>
    </>
  );
}
