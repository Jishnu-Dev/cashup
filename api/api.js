import http from "./axios";

// FOR TESTING :: TO BE REMOVED
export const apiTest = () => http.get("/getMerchantBankAccounts/1");

/*** Auth ***/
export const apiLogin = (payload) => http.post("/loginMerchant", payload);
