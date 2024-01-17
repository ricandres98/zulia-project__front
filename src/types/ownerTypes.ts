export interface OwnerType {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  secondLastName?: string | null;
  personId: number;
  createdAt: string;
}

export interface UpdateOwnerDto
  extends Partial<Omit<OwnerType, "id" | "createdAt">> {}
