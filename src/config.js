import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_FRONTEND_ADDRESS,
});

export const server = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  // baseURL: "http://localhost:5000",
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
  },
};

export const serverInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  // baseURL: "http://localhost:5000",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
