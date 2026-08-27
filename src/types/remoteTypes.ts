export interface LoginResponseType {
  user?: {
    id: number;
    role: string;
  };
  token?: string;
}
