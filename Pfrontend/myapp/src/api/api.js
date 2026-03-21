import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;