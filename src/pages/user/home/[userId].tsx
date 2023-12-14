import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { ReceiptsTable } from "../../../components/ReceiptsTable";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { FullScreenLoader } from "../../../components/FullScreenLoader";
import { useRouter } from "next/router";
import { fetchFunc } from "../../../utils/fetchFunc";
import { ErrorScreen } from "../../../components/ErrorScreen";
import styles from "../../../styles/Home.module.css";
import { ApartmentType } from "../../../types/apartmentTypes";

export default function Home() {
  const [apartment, setApartment] = useState<ApartmentType>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { getApartmentById } = fetchFunc();
    if (router.isReady) {
      const { userId } = router.query;
      (async () => {
        const [err, data] = await getApartmentById(userId as string);
        setLoading(false);
        if (!err) {
          setApartment(data);
        } else {
          setError(true);
          console.error(err);
        }
      })();
    }
  }, [router]);

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
