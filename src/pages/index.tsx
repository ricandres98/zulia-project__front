import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import { ReceiptsTable } from "../components/ReceiptsTable";
import { AuthorizationContainer } from "../containers/AuthorizationContainer";
import { FullScreenLoader } from "../components/FullScreenLoader";
import { useFetch } from "../hooks/useFetch";
import { UserTypeWithId } from "../types/userTypes";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState<UserTypeWithId>();
  const router = useRouter();
  const { getUserById } = useFetch();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      (async () => {
        const [err, data] = await getUserById(id as string);
        if (!err) {
          setUser(data);
        } else {
          console.error(err);
        }
      })();
    }
  }, [router.isReady]);

  return (
    <>
      <AuthorizationContainer>
        <FullScreenLoader />
        <Header />
        <main className={styles["main-container"]}>
          <h2>Apartamento {user?.apartment}</h2>
          <ReceiptsTable />
        </main>
      </AuthorizationContainer>
    </>
  );
}
