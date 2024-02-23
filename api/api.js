import http from "./axios";

export const apiGetAreaListByCity = () => http.get("/getAreaListByCity/1");
export const apiTest = () => http.get("/getAllBranchType");
