"use client";

import { Fragment, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import LoadingBackdrop from "@/components/ui/LoadingBackdrop";
import { toast } from "react-toastify";
import { useRouter } from "@/navigation";

const cookie = new Cookies();

// Cookie names, exporting for common use everywhere
export const cookieNameOnboardingStatus = "CASHUP_IS_ONBOARDED";
export const cookieNameToken = "CASHUP_AUTH_TOKEN";
export const cookieNameMerchantId = "CASHUP_MERCHANT_ID";
export let cookieDefaultSettings = {
  path: "/",
  httpOnly: false,
};

export const getAuthToken = () => cookie.get(cookieNameToken);
export const getMerchantId = () => cookie.get(cookieNameMerchantId);
export const getIsLoggedIn = () =>
  Boolean(getAuthToken() && !isNaN(getMerchantId())); // If token & merchant (must be a number) id exists.

export const setUserCredentials = ({ merchantId, token, keepAlive }) => {
  try {
    // If user checks remember_me while logging in, setting the expiry date for the cookie to 2 months.
    if (keepAlive) {
      const currentDate = new Date();
      const expirationDate = new Date(currentDate);
      expirationDate.setMonth(expirationDate.getMonth() + 2);
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
  const authToken = getAuthToken();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (!authToken) router.push("/login");
    else setShowOverlay(false);
  }, [authToken]);

  return (
    <Fragment>
      <LoadingBackdrop
        isOpen={showOverlay}
        message="Authenticating, Please wait a moment..."
      />
      {children}
    </Fragment>
  );
}
