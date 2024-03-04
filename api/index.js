import http from "./axios";

// Auth
export const apiLogin = (payload) =>
  http.post("/merchantPublic/loginMerchant", payload);

// Send PIN reset OTP
export const apiGetPinResetOTP = (payload) =>
  http.post("/merchantPublic/sendMailOTPPIN", payload);

// Verify Pin reset OTP
export const apiVerifyPinResetOTP = (payload) =>
  http.post("/merchantPublic/verifyOTPPIN", payload);

// Update PIN
export const apiUpdateMerchantPin = (payload) =>
  http.post("/merchantPublic/updateMerchantPIN", payload);

export const apiGetPinDefaultCheckedStatus = (merchantId) =>
  http.get(`/merchantMain/getMerchantPINDefaultChecked/${merchantId}`);

// Banks
export const apiGetMerchantBanks = (merchantId) =>
  http.get(`/merchantBank/getMerchantBankAccounts/${merchantId}`);
