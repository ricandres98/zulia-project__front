const useFetch = () => {
  const getReceiptInfo = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/receipts/${id}`);
      const data = await res.json();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  const getReceiptsList = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/receipts`);
      const data = await res.json();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  const getUserById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/${id}`);
      const data = await res.json();
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  };

  return { getReceiptInfo, getReceiptsList, getUserById };
};

export { useFetch };
