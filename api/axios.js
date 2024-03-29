import { clearUserCredentials, getAuthToken } from "@/lib/authenticator";

import axios from "axios";

let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

const authToken = getAuthToken();
const http = axios.create({
  baseURL: baseURL + "/" + apiVersion,
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": 69420,
    in_platform_type_id: 1, // 1: Web, 2: Mobile App
  },
});

// Handling no-internet
http.interceptors.request.use(
  function (config) {
    if (!navigator.onLine) {
      alert("Please check your internet connection and try again.");
      return Promise.reject("No internet connection");
    } else return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return Promise.resolve(response?.data);
  },
  function (error) {
    if (error?.response?.status === 401) clearUserCredentials(); // If token error, clear cookies. So, on next re-load, user will be redirected to login.
    delete error.stack;
    return Promise.reject(error);
  }
);

export default http;
