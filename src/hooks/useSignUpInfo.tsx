import { useEffect } from "react";
import { CreateOwnerDto } from "../types/ownerTypes";
import { useLocalStorage } from "./useLocalStorage";

interface CreateOwnerInLocalStorage extends Partial<CreateOwnerDto> {
  lastUpdate?: number;
}

function useSignUpInfo() {
  const { item: ownerInfo, saveItem: setOwnerInfo } =
    useLocalStorage<CreateOwnerInLocalStorage>(
      "Zulia_V1_create-owner-info",
      {},
    );

  const setOwnerInfoAndUpdateTime = (ownerInfo: Partial<CreateOwnerDto>) => {
    setOwnerInfo({
      ...ownerInfo,
      lastUpdate: Date.now(),
    });
  };

  useEffect(() => {
    const TWO_MIN = 120000;
    const FIVE_MIN = 300000;
    const interval = setInterval(() => {
      if (ownerInfo.lastUpdate) {
        console.log("effect");
        const fiveMinutesPassed = Date.now() - ownerInfo.lastUpdate > FIVE_MIN;
        if (fiveMinutesPassed) {
          setOwnerInfo({});
        }
      }
    }, TWO_MIN);

    return () => {
      clearInterval(interval);
    };
  });

  return { ownerInfo, setOwnerInfoAndUpdateTime };
}

export { useSignUpInfo };
