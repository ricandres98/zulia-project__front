import React from "react";
import { Header } from "../components/Header";
import styles from "../styles/Home.module.css";
import { ReceiptsTable } from "../components/ReceiptsTable";
import { AuthorizationContainer } from "../containers/AuthorizationContainer";
import { FullScreenLoader } from "../components/FullScreenLoader";

export default function Home() {
  return (
    <>
      <AuthorizationContainer>
        <FullScreenLoader />
        <Header />
        <main className={styles["main-container"]}>
          <h2>Apartamento 9A</h2>
          <ReceiptsTable />
        </main>
      </AuthorizationContainer>
    </>
  );
}
