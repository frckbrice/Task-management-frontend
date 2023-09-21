import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_FRONTEND_ADDRESS,
});

export const server = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  baseURL: "http://localhost:4000",
  // headers: {
  //   " Access-Control-Allow-Credentials": "true",
  //   "Access-Control-Allow-Origin": "http://localhost:3000",
  //   "responseType" : "application/json, "
  // },
});

export const conf = {
  serverbaseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  clientbaseURL: process.env.REACT_APP_FRONTEND_ADDRESS,
  googleapis: process.env.REACT_APP_GOOGLEAPIS,

  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "http://localhost:3001",
    // "Content-Type": "application/json, ",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  },
};

export const serverInterceptor = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  baseURL: "http://localhost:4000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
