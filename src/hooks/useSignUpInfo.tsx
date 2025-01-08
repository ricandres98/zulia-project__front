import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { SignUpInfoType } from "../types/signupTypes";

interface CreateOwnerInLocalStorage extends SignUpInfoType {
  lastUpdate?: number;
}

function useSignUpInfo() {
  const { item: ownerInfo, saveItem: setOwnerInfo } =
    useLocalStorage<CreateOwnerInLocalStorage>(
      "Zulia_V1_create-owner-info",
      {},
    );

  const setOwnerInfoAndUpdateTime = (ownerInfo: SignUpInfoType) => {
    setOwnerInfo({
      ...ownerInfo,
      lastUpdate: Date.now(),
    });
  };

  useEffect(() => {
    const ONE_MIN = 60000;
    const FIVE_MIN = 300000;
    const interval = setInterval(() => {
      if (ownerInfo.lastUpdate) {
        console.log("effect");
        const fiveMinutesPassed = Date.now() - ownerInfo.lastUpdate > FIVE_MIN;
        if (fiveMinutesPassed) {
          setOwnerInfo({});
        }
      }
    }, ONE_MIN);

    return () => {
      clearInterval(interval);
    };
  });

  return { ownerInfo, setOwnerInfoAndUpdateTime };
}

export { useSignUpInfo };
