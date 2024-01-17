import { useRouter } from "next/router";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import { authContext } from "../hooks/useAuth";
// import { authContext } from "../hooks/useAuth";

const AuthorizationContainer = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { userToken } = useContext(authContext);

  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem("ZuliaUser_V1_Token") as string,
    );
    if (!token) {
      router.push("/login");
    }
  }, [userToken]);

  return <>{children}</>;
};

export { AuthorizationContainer };
