import http from "./axios";

// Auth
export const apiLogin = (payload) =>
  http.post("/merchantPublic/loginMerchant", payload);

// GET PIN reset OTP
export const apiGetPinResetOTP = (payload) =>
  http.post("/merchantPublic/sendMailOTPPIN", payload);

// SEND Pin reset OTP
export const apiVerifyPinResetOTP = (payload) =>
  http.post("/merchantPublic/verifyOTPPIN", payload);

// UPDATE PIN
export const apiUpdateMerchantPin = (payload) =>
  http.post("/merchantPublic/updateMerchantPIN", payload);

// GET default pin changed or not status
export const apiGetPinDefaultCheckedStatus = (merchantId) =>
  http.get(`/merchantMain/getMerchantPINDefaultChecked/${merchantId}`);

// UPDATE default pin changed or not status
export const apiUpdateDefaultPinChangedStatus = (merchantId) =>
  http.post("/merchantMain/defaultCheckMerchantPIN", {
    in_merchant_id: merchantId,
  });

// Banks
export const apiGetMerchantBanks = (merchantId) =>
  http.get(`/merchantBank/getMerchantBankAccounts/${merchantId}`);
