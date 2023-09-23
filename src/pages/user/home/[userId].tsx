import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { ReceiptsTable } from "../../../components/ReceiptsTable";
import { AuthorizationContainer } from "../../../containers/AuthorizationContainer";
import { FullScreenLoader } from "../../../components/FullScreenLoader";
import { UserTypeWithId } from "../../../types/userTypes";
import { useRouter } from "next/router";
import { fetchFunc } from "../../../utils/fetchFunc";
import { ErrorScreen } from "../../../components/ErrorScreen";
import styles from "../../../styles/Home.module.css";

export default function Home() {
  const [user, setUser] = useState<UserTypeWithId>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { getUserById } = fetchFunc();
    if (router.isReady) {
      const { userId } = router.query;
      (async () => {
        const [err, data] = await getUserById(userId as string);
        setLoading(false);
        if (!err) {
          setUser(data);
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
            <h2>Apartamento {user?.apartment}</h2>
            <ReceiptsTable />
          </main>
        )}
      </AuthorizationContainer>
    </>
  );
}
