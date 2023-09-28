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
  // baseURL: "http://localhost:5001",
  headers: {
    Accept: "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  withCredentials: true,
});

export const conf = {
  serverbaseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  googleapis: process.env.REACT_APP_GOOGLEAPIS,

  headers: {
<<<<<<< HEAD
    "Content-Type": "application/x-www-form-urlencoded",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
    // "Content-Type": "application/json, ",
=======
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json, ",
>>>>>>> cda95ca57d551d5d4a5b304cd031aebd9d92a122
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  },
};

<<<<<<< HEAD

=======
export const serverInterceptor = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  // baseURL: "http://localhost:5001",
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  withCredentials: true,
});
>>>>>>> cda95ca57d551d5d4a5b304cd031aebd9d92a122
