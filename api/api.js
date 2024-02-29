import http from "./axios";

// Common: Audit auction, logging actions api
export const apiAuditAction = () => {
  const auditOptions = {
    in_merchant_id: 1,
    in_login_type_id: 1,
    in_platform_type_id: 1,
    in_ip_address: "10.100.10.1",
    in_audit_action_id: 1,
  };
  return http.post("/merchantMain/insertAuditMerchantData", payload);
};

// Auth
export const apiLogin = (payload) =>
  http.post("/merchantPublic/loginMerchant", payload);

export const apiResetPin = (payload) =>
  http.post("/merchantMain/updateMerchantPIN", payload);

// Banks
export const apiGetMerchantBanks = (merchantId) =>
  http.get(`/merchantBank/getMerchantBankAccounts/${merchantId}`);
