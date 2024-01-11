import React, { PropsWithChildren, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { api } from "../utils/fetchFunc";
import { LoginResponseType } from "../types/remoteTypes";

export interface LoginBody {
  email: string;
  password: string;
}

interface initialValueType {
  isAuth: boolean | unknown;
  userToken: string | unknown;
  isAdmin: boolean;
  // eslint-disable-next-line no-unused-vars
  setAdmin: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  login: (body: LoginBody) => Promise<[Error | null, LoginResponseType | null]>;
  logout: () => void;
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const authContext = React.createContext<initialValueType>({
  isAuth: false,
  isAdmin: false,
  userToken: null,
  setAdmin: () => {},
  // eslint-disable-next-line no-unused-vars
  login: async (body: LoginBody) => {
    return [null, null];
  },
  logout: () => {},
  firstLoad: true,
  setFirstLoad: () => {},
});

const useAuth = () => {
  const { item: isAuth, saveItem: setIsAuth } = useLocalStorage(
    "ZuliaUser_V1",
    false,
  );
  const { item: userToken, saveItem: setUserToken } = useLocalStorage(
    "ZuliaUser_V1_Token",
    false,
  );
  const [firstLoad, setFirstLoad] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<[Error | null, LoginResponseType | null]> => {
    try {
      const res = await api.auth.login({ email, password });
      const data: LoginResponseType = await res.json();

      setUserToken(data.token);
      setIsAuth(true);
      return [null, data];
    } catch (err) {
      return [err as Error, null];
    }
  };

  const logout = () => {
    setIsAuth(false);
    setIsAdmin(false);
    setUserToken(null);
  };

  const setAdmin = (value: boolean) => {
    setIsAdmin(value);
  };

  return {
    isAuth,
    login,
    logout,
    firstLoad,
    setFirstLoad,
    isAdmin,
    setAdmin,
    userToken,
    setUserToken,
  };
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const value = useAuth();

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { useAuth, AuthProvider, authContext };
