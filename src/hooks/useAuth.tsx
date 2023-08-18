import React, { PropsWithChildren, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface initialValueType {
  isAuth: boolean | unknown;
  login: () => void;
  logout: () => void;
  firstLoad: boolean;
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const authContext = React.createContext<initialValueType>({
  isAuth: false,
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

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return { isAuth, login, logout, firstLoad, setFirstLoad };
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const value = useAuth();

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { useAuth, AuthProvider, authContext };
