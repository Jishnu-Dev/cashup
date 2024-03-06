"use client";

import { Backdrop, CircularProgress } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const cookie = new Cookies();

// Cookie names, exporting for common use everywhere
export const cookieNameOnboardingStatus = "cashup_is_onboarded";
export const cookieNameToken = "cashup_auth_token";
export const cookieNameMerchantId = "cashup_merchant_id";
export let cookieDefaultSettings = {
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
      <Overlay isOpen={showOverlay} />
      {children}
    </Fragment>
  );
}

const Overlay = ({ isOpen }) => (
  <Backdrop
    sx={{
      color: "#fff",
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
    open={isOpen}
    className="flex flex-col gap-3"
    // onClick={handleClose}
  >
    <CircularProgress color="inherit" />
    <p>Authenticating, Please wait a moment...</p>
  </Backdrop>
);
