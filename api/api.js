import http from "./axios";

export const apiHome = http.get("/products");
