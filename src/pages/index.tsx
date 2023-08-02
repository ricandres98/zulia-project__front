// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (loggedIn) {
  //       router.push("/home");
  //     } else {
  //       router.push("/login");
  //     }
  //   }
  // }, [router]);

  if (loggedIn) {
    return (
      <>
        <h1>Home</h1>
        <button onClick={() => setLoggedIn(false)}>logout</button>
      </>
    );
  } else {
    router.push("/login");
    // return (
    //   <>
    //     <h1>Página de Login</h1>
    //     <button onClick={() => setLoggedIn(true)}>login</button>
    //   </>
    // );
  }
}
