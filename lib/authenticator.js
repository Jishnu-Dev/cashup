"use client";

/***** Wrote by: Jishnu Raj, https://github.com/Jishnu-Dev on 07-03-2024 *****/

import { Fragment, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import LoadingBackdrop from "@/components/ui/LoadingBackdrop";
import dayjs from "dayjs";
import { useRouter } from "@/navigation";

export let cookieDefaultSettings = {
  path: "/",
  httpOnly: false,
};

const cookie = new Cookies(cookieDefaultSettings);

// Cookie names, exporting for common use everywhere
export const cookieNameToken = "CASHUP_AUTH_TOKEN";
export const cookieNameMerchantId = "CASHUP_MERCHANT_ID";
export const cookieNameLastLogin = "CASHUP_LAST_LOGIN";
export const cookieNameOnboardingStatus = "CASHUP_IS_ONBOARDED";
export const loginExpiryDays = 7;

export const getAuthToken = () => cookie.get(cookieNameToken);
export const getMerchantId = () => cookie.get(cookieNameMerchantId);
export const getIsLoggedIn = () =>
  Boolean(getAuthToken() && !isNaN(getMerchantId())); // If token & merchant (must be a number) id exists.

export const clearUserCredentials = () => {
  cookie.remove(cookieNameToken);
  cookie.remove(cookieNameMerchantId);
  cookie.remove(cookieNameLastLogin);
};

export default function Authenticator({ children }) {
  const authToken = getAuthToken();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(true);

  // If no token cookie, pushing to login
  useEffect(() => {
    if (!authToken) router.push("/login");
    else setShowOverlay(false);
  }, [authToken]);

  useEffect(() => {
    extendCookieExpiry();
  }, []);

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

function extendCookieExpiry() {
  try {
    const lastLogin = new Date(cookie.get(cookieNameLastLogin));
    const currentDate = new Date();
    if (!lastLogin) return;
    const daysFromLastLogin = dayjs(currentDate).diff(dayjs(lastLogin), "days");
    let cookieSettings = cookieDefaultSettings;
    if (daysFromLastLogin >= 5) {
      cookieSettings = {
        ...cookieSettings,
        expires: currentDate.setDate(currentDate.getDate() + loginExpiryDays), // Add 5 more days to expiry
      };
      cookie.set(cookieNameToken, getAuthToken(), cookieSettings);
      cookie.set(cookieNameMerchantId, getMerchantId(), cookieSettings);
      cookie.set(cookieNameLastLogin, new Date().toISOString(), cookieSettings);
    }
  } catch (e) {
    console.log(e);
  }
}
