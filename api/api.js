import http from "./axios";

export const apiGetAreaListByCity = () => http.get("/getAreaListByCity/1");
