export interface UserData {
  field: string;
  value: string | undefined;
  editable: boolean;
  name: string;
}

export interface UserType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  apartment: string;
  residence: string;
}

export interface UserTypeWithId extends UserType {
  id: number;
}

interface UserTypefromAPI {
  id: number;
  email: string;
  password: string;
  apartmentId: number;
  role: "user" | "admin";
}

interface CreateUserDto extends Omit< UserTypefromAPI, "id"> {}

export type { UserTypefromAPI, CreateUserDto };