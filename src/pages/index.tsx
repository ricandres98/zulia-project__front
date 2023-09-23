import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { authContext } from "../hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { isAuth } = useContext(authContext);

  useEffect(() => {
    if (router.isReady) {
      if (!isAuth) {
        router.push("/login");
      } else {
        router.push("user/home/1");
      }
    }
  }, [router, isAuth]);

  return <></>;
}
