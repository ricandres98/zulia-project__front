import React, { PropsWithChildren, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface initialValueType {
  isAuth: boolean | unknown;
  isAdmin: boolean;
  // eslint-disable-next-line no-unused-vars
  setAdmin: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const authContext = React.createContext<initialValueType>({
  isAuth: false,
  isAdmin: false,
  setAdmin: () => {},
  login: () => {},
  logout: () => {},
  firstLoad: true,
  setFirstLoad: () => {},
});

const useAuth = () => {
  const { item: isAuth, saveItem: setIsAuth } = useLocalStorage(
    "ZuliaUser_V1",
    false,
  );
  const [firstLoad, setFirstLoad] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    setIsAdmin(false);
  };

  const setAdmin = (value: boolean) => {
    setIsAdmin(value);
  };

  return { isAuth, login, logout, firstLoad, setFirstLoad, isAdmin, setAdmin };
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const value = useAuth();

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { useAuth, AuthProvider, authContext };
