import { authToken, clearCookies } from "@/lib/authenticator";

import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/v1",
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

http.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    console.info(error);
    if (error?.response?.status === 401) clearCookies(); // If token error, clear cookies. So, on next re-load, user will be redirected to login.
    return Promise.reject(error);
  }
);

export default http;
