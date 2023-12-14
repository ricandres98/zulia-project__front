import { OwnerType } from "./ownerTypes";

export interface ApartmentType {
  id: number;
  apartmentNumber: string;
  aliquot: number;
  createdAt: string;
  ownerId: number;
  debt: number | null;
  owner: OwnerType;
}
