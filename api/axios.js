import { clearUserCredentials, getAuthToken } from "@/lib/authenticator";

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
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

http.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    if (error?.response?.status === 401) clearUserCredentials(); // If token error, clear cookies. So, on next re-load, user will be redirected to login.
    delete error.stack;
    return Promise.reject(error);
  }
);

export default http;
