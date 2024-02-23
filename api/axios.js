import axios from "axios";

const http = axios.create({
  baseURL: "https://98c1-2-50-37-171.ngrok-free.app",
  headers: {
    //   'Authorization': 'Bearer //token',
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

export default http;
