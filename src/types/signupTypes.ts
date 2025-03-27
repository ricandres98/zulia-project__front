import { CreateOwnerDto } from "./ownerTypes";

export interface SignUpInfoType extends Partial<CreateOwnerDto> {
  ownerId?: number;
  apartmentId?: number;
  email?: string;
}
