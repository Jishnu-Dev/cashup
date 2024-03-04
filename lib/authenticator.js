"use client";

import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const cookie = new Cookies();

// Cookie names, exporting for common use everywhere
export const cookieNameOnboardingStatus = "cashup_is_onboarded";
export const cookieNameToken = "cashup_auth_token";
export const cookieNameMerchantId = "cashup_merchant_id";
export let cookieDefaultSettings = {
  httpOnly: false,
};

export const authToken = cookie.get(cookieNameToken);
export const merchantId = cookie.get(cookieNameMerchantId);
export const isLoggedIn = Boolean(authToken && !isNaN(merchantId)); // If token & merchant (must be a number) id exists.

export const setUserCredentials = ({ merchantId, token, keepAlive }) => {
  try {
    // If user checks remember_me while logging in, setting the expiry date for the cookie to 1 month.
    if (keepAlive) {
      const currentDate = new Date();
      const expirationDate = new Date(currentDate);
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      cookieDefaultSettings = {
        ...cookieDefaultSettings,
        expires: expirationDate,
      };
    }
    cookie.set(cookieNameToken, token, cookieDefaultSettings);
    cookie.set(cookieNameMerchantId, merchantId, cookieDefaultSettings);
  } catch (e) {
    toast.error("Error logging you in, please try again");
    console.log(e);
  }
};

export const clearUserCredentials = () => {
  cookie.remove(cookieNameToken);
  cookie.remove(cookieNameMerchantId);
};

export default function Authenticator({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!authToken) router.push("/login");
  }, [authToken]);
  return children;
}
