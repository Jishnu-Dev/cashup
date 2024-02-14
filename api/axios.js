import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
    //   'Authorization': 'Bearer //token',
      'Content-Type': 'application/json'
    }
  });

  export default http