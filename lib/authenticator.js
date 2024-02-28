"use client";

import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const cookie = new Cookies();

export const authToken = cookie.get("cashup_auth_token");
export const merchantId = cookie.get("cashup_merchant_id");
export const isLoggedIn = Boolean(authToken && !isNaN(merchantId)); // If token & merchant (must be a number) id exists.

export const clearCookies = () => {
  cookie.remove("cashup_auth_token");
  cookie.remove("cashup_merchant_id");
};

export default function Authenticator({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (authToken) return; // If valid auth token exists, do nothing
    // toast.error("Unauthenticated. Please login to continue");
    router.push("/login");
  }, [authToken]);
  return children;
}
