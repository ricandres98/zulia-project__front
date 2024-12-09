import type { ResponseTuple } from "../types/ApiTypes";
import type { ApartmentType } from "../types/apartmentTypes";
import type { OwnerType, UpdateOwnerDto } from "../types/ownerTypes";
import type { Period } from "../types/periodsTypes";
import { ReceiptGeneralInfoType } from "../types/receiptTypes";
import type {
  CreateTransactionDto,
  TransactionWithId,
} from "../types/transactionsTypes";
import { config } from "./config";

const API_URL = config.apiUrl;

const api = {
  receipts: {
    getReceiptInfo: async (id: number, token: string) => {
      try {
        const res = await fetch(`${API_URL}/api/v1/receipts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        return [null, data];
      } catch (err) {
        return [err, null];
      }
    },

    getReceiptsList: async (
      token: string,
    ): Promise<ResponseTuple<ReceiptGeneralInfoType[]>> => {
      try {
        const res = await fetch(`${API_URL}/api/v1/receipts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        return [null, data];
      } catch (err: any) {
        return [err, null];
      }
    },
  },

  auth: {
    login: async ({ email, password }: { email: string; password: string }) => {
      const body = {
        email,
        password,
      };
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify(body),
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 401) {
        throw new Error("unauthorized");
      }

      return res;
    },
  },

  owners: {
    updateOwner: async (
      id: number,
      body: UpdateOwnerDto,
      token: string,
    ): Promise<ResponseTuple<OwnerType>> => {
      try {
        const res = await fetch(`${API_URL}/api/v1/owners/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
            "Access-Control-Allow-Methods":
              "GET, HEAD, POST, PUT, DELETE, OPTIONS",
          },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        return [null, data];
      } catch (error: any) {
        return [error, null];
      }
    },
  },

  apartments: {
    getApartmentById: async (
      id: string,
      token: string,
    ): Promise<ResponseTuple<ApartmentType>> => {
      try {
        const res = await fetch(`${API_URL}/api/v1/apartments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        return [null, data];
      } catch (err: any) {
        return [err, null];
      }
    },
    getApartmentByToken: async (
      token: string,
    ): Promise<ResponseTuple<ApartmentType>> => {
      try {
        const res = await fetch(`${API_URL}/api/v1/apartments/by-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data: ApartmentType = await res.json();
        return [null, data];
      } catch (err: any) {
        return [err, null];
      }
    },
  },

  transactions: {
    getTransactionsList: async (): Promise<
      ResponseTuple<TransactionWithId[]>
    > => {
      try {
        const res = await fetch(`${API_URL}/api/v1/transactions`);
        const data: TransactionWithId[] = await res.json();
        return [null, data];
      } catch (error) {
        return [error as Error, null];
      }
    },

    createNewTransaction: async (body: CreateTransactionDto, token: string) => {
      try {
        const res = await fetch(`${API_URL}/api/v1/transactions`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
            "Access-Control-Allow-Methods":
              "GET, HEAD, POST, PUT, DELETE, OPTIONS",
          },
        });

        // Analiza el código de estado de la respuesta antes de enviar
        const data = await res.json();
        if (res.status === 200) {
          return [null, data];
        } else {
          return [data, null];
        }
      } catch (error) {
        return [error, null];
      }
    },
  },

  periods: {
    getPeriods: async (): Promise<ResponseTuple<Period[]>> => {
      try {
        const res = await fetch(`${API_URL}/api/v1/periods/`);
        const data: Period[] = await res.json();
        return [null, data];
      } catch (err) {
        return [err as Error, null];
      }
    },
  },
};

export { api };
// const fetchFunc = () => {
//   const getReceiptInfo = async (id: number) => {
//     try {
//       const res = await fetch(`${API_URL}/api/v1/receipts/${id}`);
//       const data = await res.json();
//       return [null, data];
//     } catch (err) {
//       return [err, null];
//     }
//   };

//   const getReceiptsList = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/v1/receipts`);
//       const data = await res.json();
//       return [null, data];
//     } catch (err) {
//       return [err, null];
//     }
//   };

//   const getApartmentById = async (id: string) => {
//     try {
//       const res = await fetch(`${API_URL}/api/v1/apartments/${id}`);
//       const data = await res.json();
//       return [null, data];
//     } catch (err) {
//       return [err, null];
//     }
//   };

//   const getTransactionsList = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/v1/transactions`);
//       const data = await res.json();
//       return [null, data];
//     } catch (error) {
//       return [error, null];
//     }
//   };

//   return {
//     getReceiptInfo,
//     getReceiptsList,
//     getApartmentById,
//     getTransactionsList,
//   };
// };
