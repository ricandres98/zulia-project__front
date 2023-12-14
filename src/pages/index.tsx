import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { authContext } from "../hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { isAuth, isAdmin } = useContext(authContext);

  useEffect(() => {
    if (router.isReady) {
      if (!isAuth) {
        router.push("/login");
      } else {
        router.push(isAdmin ? "admin/home/1" : "user/home/1");
      }
    }
  }, [router, isAuth]);

  return <></>;
}
