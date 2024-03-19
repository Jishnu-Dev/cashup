"use client";

import { Card, CardContent, CardHeader } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";
import { apiVerifyEmailAddress } from "@/api";
import cn from "classnames";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const merchantId = searchParams.get("merch_id");

  return (
    <TwoColumnLayout illustration="illust-full-inbox-flatline.svg">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Card>
          <CardHeader title="Verify email address" />
          <CardContent>
            {!merchantId ? (
              <BrokenLinkScreen />
            ) : (
              <Validator merchantId={merchantId} />
            )}
          </CardContent>
        </Card>
      </div>
    </TwoColumnLayout>
  );
}

const Validator = ({ merchantId }) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const verifyEmail = async () => {
    try {
      const resp = await apiVerifyEmailAddress({
        in_merchant_id: Number(merchantId),
      });
      setResponse(resp);
      console.log("resp:", resp);
    } catch (e) {
      setResponse(e?.response?.data);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (merchantId) verifyEmail();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      {isLoading ? <LoadingScreen /> : <ResponseScreen response={response} />}
    </div>
  );
};

const ResponseScreen = ({ response }) => {
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

const LoadingScreen = () => (
  <Fragment>
    <CircularProgress />
    <p className="text-center">Verifying your email address, please wait...</p>
  </Fragment>
);

const BrokenLinkScreen = () => (
  <div className="w-full h-full flex flex-col justify-center items-center gap-3">
    <span className="icon-[solar--link-broken-line-duotone] text-red-500 text-6xl" />
    <p className="text-center">The URL you followed seems to be broken...</p>
  </div>
);
