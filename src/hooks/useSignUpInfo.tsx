import { CreateOwnerDto } from "../types/ownerTypes";
import { useLocalStorage } from "./useLocalStorage";

function useSignUpInfo() {
  const { item: ownerInfo, saveItem: setOwnerInfo } = useLocalStorage<
    Partial<CreateOwnerDto>
  >("Zulia_V1_create-owner-info", {});

  return { ownerInfo, setOwnerInfo };
}

export { useSignUpInfo };
