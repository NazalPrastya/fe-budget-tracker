import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_V1,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
