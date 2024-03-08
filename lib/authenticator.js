"use client";

/***** Wrote by: Jishnu Raj, https://github.com/Jishnu-Dev on 07-03-2024 *****/

import { Fragment, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import LoadingBackdrop from "@/components/ui/LoadingBackdrop";
import { toast } from "react-toastify";
import { useRouter } from "@/navigation";

export let cookieDefaultSettings = {
  path: "/",
  httpOnly: false,
};

const cookie = new Cookies(cookieDefaultSettings);

// Cookie names, exporting for common use everywhere
export const cookieNameOnboardingStatus = "CASHUP_IS_ONBOARDED";
export const cookieNameToken = "CASHUP_AUTH_TOKEN";
export const cookieNameMerchantId = "CASHUP_MERCHANT_ID";

export const getAuthToken = () => cookie.get(cookieNameToken);
export const getMerchantId = () => cookie.get(cookieNameMerchantId);
export const getIsLoggedIn = () =>
  Boolean(getAuthToken() && !isNaN(getMerchantId())); // If token & merchant (must be a number) id exists.

export const setUserCredentials = ({ merchantId, token, keepAlive }) => {
  try {
    // If remember_me, keeps logged in to 12 months
    // Default, Adding 7 days to the current date to expire
    let expirationDate;
    const currentDate = new Date();
    expirationDate = new Date(currentDate);

    if (keepAlive) expirationDate.setDate(expirationDate.getDate() + 7);
    // if (keepAlive) expirationDate.setMonth(expirationDate.getMonth() + 12);
    // else expirationDate.setDate(expirationDate.getDate() + 7);

    cookieDefaultSettings = {
      ...cookieDefaultSettings,
      expires: expirationDate,
    };
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

  // If no token cookie, pushing to login
  useEffect(() => {
    // FOR TESTING, TO BE REMOVED
    const DISABLE_ATUH = true;
    if (DISABLE_ATUH) {
      setShowOverlay(false);
      return;
    }
    // FOR TESTING

    if (!authToken) router.push("/login");
    else setShowOverlay(false);
  }, [authToken]);

  /*  Resetting expiry date of cookie to 7 days from now, as user is actively using
   *  the dashboard. If no activity for 7 days, cookies will be expired */
  useEffect(() => {
    const oneHourInSeconds = 1000 * 60 * 60;
    const activityTimer = setInterval(resetCookieExpiry, oneHourInSeconds); // Reset every hour
    return () => clearInterval(activityTimer);
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

function resetCookieExpiry() {
  const authToken = getAuthToken();
  let expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  cookieDefaultSettings = {
    ...cookieDefaultSettings,
    expires: expirationDate,
  };
  if (authToken) {
    cookie.set(cookieNameToken, authToken, cookieDefaultSettings);
    cookie.set(cookieNameMerchantId, getMerchantId(), cookieDefaultSettings);
  }
}
