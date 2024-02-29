"use client";

import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const cookie = new Cookies();
const cookieNameToken = "cashup_auth_token";
const cookieNameMerchantId = "cashup_merchant_id";
const cookieSettings = {
  httpOnly: false,
  maxAge: 3600, // Cookie will expire in 1 hour
};

export const authToken = cookie.get(cookieNameToken);
export const merchantId = cookie.get(cookieNameMerchantId);
export const isLoggedIn = Boolean(authToken && !isNaN(merchantId)); // If token & merchant (must be a number) id exists.

export const setUserCredentials = ({ merchantId, token }) => {
  try {
    cookie.set(cookieNameToken, token, cookieSettings);
    cookie.set(cookieNameMerchantId, merchantId, cookieSettings);
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
