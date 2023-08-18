import { useRouter } from "next/router";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { authContext } from "../hooks/useAuth";

const AuthorizationContainer = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isAuth } = useContext(authContext);

  useEffect(() => {
    if (router.isReady) {
      if (!isAuth) {
        router.push("/login");
      }
    }
  }, [router, isAuth]);

  if (isAuth) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};

export { AuthorizationContainer };
