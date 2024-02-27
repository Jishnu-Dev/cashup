import axios from "axios";

const token = "sample_token";

const http = axios.create({
  baseURL: "http://localhost:5000/v1",
  headers: {
    Authorization: `Bearer ${token}`,
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
