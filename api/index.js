import http from "./axios";

/*  Auth */
export const apiLogin = (payload) =>
  http.post("/merchantPublic/loginMerchant", payload);

/*  GET PIN reset OTP */
export const apiGetPinResetOTP = (payload) =>
  http.post("/merchantPublic/sendMailOTPPIN", payload);

/*  SEND PIN reset OTP */
export const apiVerifyPinResetOTP = (payload) =>
  http.post("/merchantPublic/verifyOTPPIN", payload);

/*  Verify email address */
export const apiVerifyEmailAddress = (payload) =>
  http.post("/merchantPublic/verifyMerchantEmail", payload);

/* Send Mail verification link */
export const apiSendMailVerificationLink = (payload) =>
  http.post("/merchantMain/sendMailVerification", payload);

/*  UPDATE PIN */
export const apiUpdateMerchantPin = (payload) =>
  http.post("/merchantPublic/updateMerchantPIN", payload);

/*  GET default pin changed or not status */
export const apiGetPinDefaultCheckedStatus = (merchantId) =>
  http.get(`/merchantMain/getMerchantPINDefaultChecked/${merchantId}`);

/*  UPDATE default pin changed or not status */
export const apiUpdateDefaultPinChangedStatus = (merchantId) =>
  http.post("/merchantMain/defaultCheckMerchantPIN", {
    in_merchant_id: merchantId,
  });

/*  GET Merchant profile */
export const apiGetMerchantProfile = (merchantId) =>
  http.get(`/merchantMain/getMerchantProfile/${merchantId}`);

/*  UPDATE Merchant profile */
export const apiUpdateMerchantDetails = (payload) =>
  http.post(`/merchantMain/updateMerchantProfile`, payload);

/*  Banks */
export const apiGetMerchantBanks = (merchantId) =>
  http.get(`/merchantBank/getMerchantBankAccounts/${merchantId}`);

/****  Lookup tables ****/
export const apiGetBranchTypes = () =>
  http.get("/merchantLookup/getAllBranchType");

export const apiGetIndustryTypes = () =>
  http.get("/merchantLookup/getAllIndustry");

export const apiGetCitiesByCountry = (countryId) =>
  http.get(`/merchantLookup/getCityListByCountry/${countryId}`);

export const apiGetAreasByCity = (cityId) =>
  http.get(`/merchantLookup/getAreaListByCity/${cityId}`);
