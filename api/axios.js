import axios from "axios";

const http = axios.create({
  baseURL: "https://0381-2-50-37-171.ngrok-free.app",
  headers: {
    //   'Authorization': 'Bearer //token',
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

// http.interceptors.response.use(
//   function (response) {},
//   function (error) {
//     return Promise.reject({
//       jishnu: true,
//       error,
//     });
//   }
// );

export default http;
