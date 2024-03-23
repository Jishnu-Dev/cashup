"use client";

import { Fragment, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";
import { apiVerifyEmailAddress } from "@/api";
import cn from "classnames";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const merchantId = searchParams.get("mid");
  const token = searchParams.get("token");

  const [isInvalidLink, setIsInvalidLink] = useState(false);
  useEffect(() => {
    const isInValidToken = token?.length != 63;
    if (!merchantId) setIsInvalidLink(true);
    else if (!token) setIsInvalidLink(true);
    else if (isInValidToken) setIsInvalidLink(true);
  }, []);

  return (
    <TwoColumnLayout illustration="illust-mail-lady.svg">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        {isInvalidLink ? (
          <ScreenBrokenLink />
        ) : (
          <Validator merchantId={merchantId} token={token} />
        )}
      </div>
    </TwoColumnLayout>
  );
}

const Validator = ({ merchantId, token }) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyEmail() {
      try {
        const resp = await apiVerifyEmailAddress({
          in_merchant_id: Number(merchantId),
          in_token: token,
        });
        setResponse(resp);
      } catch (e) {
        setResponse(e?.response?.data);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    verifyEmail();
  }, [merchantId, token]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      {isLoading ? <ScreenLoading /> : <ScreenResult response={response} />}
    </div>
  );
};

const ScreenResult = ({ response }) => {
  const statuses = {
    Success: {
      icon: "icon-[solar--verified-check-line-duotone]",
      color: "text-primary",
    },
    Error: {
      icon: "icon-[solar--danger-circle-line-duotone]",
      color: "text-red-500",
    },
  };

  const icon =
    response?.code !== 200 ? statuses.Error.icon : statuses.Success.icon;
  const color =
    response?.code !== 200 ? statuses.Error.color : statuses.Success.color;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <span className={cn("text-6xl", icon, color)} />
      <p>
        {response?.message ?? "Something went wrong, please try again later."}
      </p>
    </div>
  );
};

const ScreenLoading = () => (
  <Fragment>
    <CircularProgress />
    <p className="text-center">Verifying your email address, please wait...</p>
  </Fragment>
);

const ScreenBrokenLink = () => (
  <div className="w-full h-full flex flex-col justify-center items-center gap-3">
    <span className="icon-[solar--link-broken-line-duotone] text-red-500 text-6xl" />
    <p className="text-center">The URL you followed seems to be broken...</p>
  </div>
);
