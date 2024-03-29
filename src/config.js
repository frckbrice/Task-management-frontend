import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_FRONTEND_ADDRESS,
});

export const server = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  // baseURL: "http://localhost:5001",
});

export const serverInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  // baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

export const conf = {
  serverbaseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  googleapis: process.env.REACT_APP_GOOGLEAPIS,

  headers: {
    "Content-Type": "application/x-www-form-urlencoded",

    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Access-Control-Allow-origin":
      "https://tms-app-frontend.vercel.app/, http://localhost:3000",
  },
};
