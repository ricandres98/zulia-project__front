// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { useState } from "react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { authContext } from "../hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { logout, isAuth } = React.useContext(authContext);

  useEffect(() => {
    if (router.isReady) {
      if (isAuth) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }
  }, [router]);

  if (isAuth) {
    return (
      <>
        <h1>Home</h1>
        <button onClick={logout}>logout</button>
      </>
    );
  } else {
    // router.push("/login");
    // return (
    //   <>
    //     <h1>Página de Login</h1>
    //     <button onClick={() => setLoggedIn(true)}>login</button>
    //   </>
    // );
  }
}
