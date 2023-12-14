import dotenv from "dotenv";

dotenv.config();

const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};

export { config };
