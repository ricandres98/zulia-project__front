import React from "react";
import { useLocalStorage } from "./useLocalStorage";

interface initialValueType {
  isAuth: boolean | unknown;
  login: () => void;
  logout: () => void;
}

const authContext = React.createContext<initialValueType>({
  isAuth: false,
  login: () => {},
  logout: () => {},
});

const useAuth = () => {
  const { item: isAuth, setItem: setIsAuth } = useLocalStorage(
    "ZuliaUser_V1",
    false,
  );

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return { isAuth, login, logout };
};

interface PropTypes {
  children: React.JSX.Element;
}

const AuthProvider = ({ children }: PropTypes) => {
  const value = useAuth();

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export { useAuth, AuthProvider, authContext };
