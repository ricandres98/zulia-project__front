import { config } from "./config";

const API_URL = config.apiUrl;

const api = {
  receipts: {
    getReceiptInfo: async (id: number) => {
      try {
        const res = await fetch(`${API_URL}/api/v1/receipts/${id}`);
        const data = await res.json();
        return [null, data];
      } catch (err) {
        return [err, null];
      }
    },

    getReceiptsList: async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/receipts`);
        const data = await res.json();
        return [null, data];
      } catch (err) {
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

  apartments: {
    getApartmentById: async (id: string) => {
      try {
        const res = await fetch(`${API_URL}/api/v1/apartments/${id}`);
        const data = await res.json();
        return [null, data];
      } catch (err) {
        return [err, null];
      }
    },
  },
};

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

export { api };
