import http from "./axios";

// Common: Audit auction, logging actions api
export const apiAuditAction = (payload) =>
  http.post("/merchantMain/insertAuditMerchantData", payload);

// Auth
export const apiLogin = (payload) =>
  http.post("/merchantPublic/loginMerchant", payload);

// Banks
export const apiGetMerchantBanks = (merchantId) =>
  http.get(`/merchantBank/getMerchantBankAccounts/${merchantId}`);
