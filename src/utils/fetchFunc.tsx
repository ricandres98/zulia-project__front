import { config } from "./config";

const API_URL = config.apiUrl;

const fetchFunc = () => {
  const getReceiptInfo = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/receipts/${id}`);
      const data = await res.json();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  const getReceiptsList = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/receipts`);
      const data = await res.json();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  const getApartmentById = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/apartments/${id}`);
      const data = await res.json();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  const getTransactionsList = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/transactions`);
      const data = await res.json();
      return [null, data];
    } catch (error) {
      return [error, null];
    }
  };

  return { getReceiptInfo, getReceiptsList, getApartmentById, getTransactionsList };
};

export { fetchFunc };
