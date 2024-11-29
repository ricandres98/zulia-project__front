import { useContext, useEffect, useState } from "react";
import { authContext } from "./useAuth";
import { ResponseTuple } from "../types/ApiTypes";

type UseFetchParams<T> = {
  // eslint-disable-next-line no-unused-vars
  setInfo: (data: T) => void;
  // eslint-disable-next-line no-unused-vars
  callback: (token: string) => Promise<ResponseTuple<T>>;
};

function useTokenFetch<T>({ setInfo, callback }: UseFetchParams<T>) {
  const { userToken } = useContext(authContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (userToken) {
        const [err, data] = await callback(userToken as string);
        setLoading(false);
        if (!err) {
          console.log(data);
          setInfo(data);
        } else {
          setError(true);
          console.error(err);
        }
      }
    })();
  }, [userToken, callback, setInfo]);

  return {
    error,
    loading,
  };
}

export { useTokenFetch };
