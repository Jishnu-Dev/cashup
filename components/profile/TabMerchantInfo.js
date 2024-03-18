"use client";

import { Fragment, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import EmailVerificationModal from "@/components/profile/EmailVerificationModal";
import FullPageLoader from "@/components/ui/loaders/FullPageLoader";
import ShowWhen from "@/components/ui/ShowWhen";
import { apiGetMerchantProfile } from "@/api";
import { getMerchantId } from "@/lib/authenticator";
import { useRouter } from "@/navigation";

export default function MerchantDetails() {
  // Fetching data
  const [isLoading, setIsLoading] = useState(true);
  const [merchantData, setMerchantData] = useState();

  useEffect(() => {
    async function fetchMerchantProfile() {
      try {
        const merchantId = getMerchantId();
        const resp = await apiGetMerchantProfile(merchantId);
        setMerchantData(resp?.data);
      } catch (e) {
        console.dir(e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMerchantProfile();
  }, []);

  return isLoading ? (
    <FullPageLoader onlySpinner />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-5">
      <BasicInfo merchantData={merchantData} />
      <CoreAccountInfo merchantData={merchantData} />
    </div>
  );
}

const BasicInfo = ({ merchantData }) => {
  const router = useRouter();
  const getBasicInfos = (data) => {
    if (!data) return [];
    return [
      {
        label: "Merchant ID",
        value: data?.merchant_id,
        isLocked: true,
      },
      {
        label: "Merchant Name",
        value: data?.merchant_name,
      },
      {
        label: "Address",
        value: data?.address,
      },
      {
        label: "Status",
        value: data?.merchant_status,
        isLocked: true,
      },
    ];
  };

  return (
    <Card className="plain-card">
      <CardHeader
        title="Basic Info"
        subheader="View or update your account details"
        action={
          <Button
            onClick={() => {
              router.push("/profile/edit-profile");
            }}
            startIcon={<span className="icon-[solar--pen-line-duotone]" />}
          >
            Edit Details
          </Button>
        }
        avatar={<CardTitleIcon icon="icon-[solar--document-text-outline]" />}
      />
      <CardContent>
        <div className="h-full flex flex-col justify-between">
          <ul>
            {getBasicInfos(merchantData)?.map(
              ({ label, value, isLocked }, i) => (
                <InfoRow
                  key={i}
                  as="li"
                  label={label}
                  value={value}
                  isLocked={isLocked}
                />
              )
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const CoreAccountInfo = ({ merchantData }) => {
  // Mail verification
  const [isMailVerifModalOpen, setIsMailVerifModalOpen] = useState(false);

  const createAccountInfoArray = (data) => {
    if (!data) return [];
    return [
      {
        label: "Email Address",
        value: data?.email_address,
        actionLabel: !data?.is_email_verified ? null : "Verify Email",
        actionHandler: () => setIsMailVerifModalOpen(true),
      },
      {
        label: "Mobile Number",
        value: data?.mobile_no,
        actionLabel: !data?.is_mobile_verified ? null : "Verify Mobile Number",
        actionHandler: () => alert("Mobile verify Handler"),
      },
      {
        label: "Telephone",
        value: data?.tel_no,
      },
    ];
  };

  return (
    <Fragment>
      <Card className="h-max flex-grow-0 plain-card">
        <CardHeader
          title="Account Info"
          subheader="View or update your account details"
          avatar={<CardTitleIcon icon="icon-[solar--tuning-2-broken]" />}
        />
        <CardContent>
          <div className="h-full flex flex-col gapp-3 justify-between">
            <ul>
              {createAccountInfoArray(merchantData).map(
                ({ label, value, actionLabel, actionHandler }, i) => (
                  <InfoRow
                    key={i}
                    label={label}
                    value={value}
                    actionLabel={actionLabel}
                    actionHandler={actionHandler}
                  />
                )
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
      <EmailVerificationModal
        isOpen={isMailVerifModalOpen}
        handleClose={() => setIsMailVerifModalOpen(false)}
      />
    </Fragment>
  );
};

// const StatusPill = ({ status = "unknown" }) => {
//   const color = status.toLowerCase() === "active" ? "success" : "default";
//   return (
//     <Chip className="w-max" label={status} variant="outlined" color={color} />
//   );
// };

const InfoRow = ({
  as = "div",
  label,
  value,
  actionLabel,
  actionHandler,
  isLocked,
}) => {
  const As = as;
  return (
    <Fragment>
      <As className="w-full py-3 first:pt-0 last:pb-0 border- last:border-none flex justify-between items-end">
        {/* Left */}
        <div className="grid grid-flow-row gap-1">
          <p className="text-black/60 text-sm">{label}</p>
          <p className="text-black">{value}</p>
        </div>
        {/* Right */}
        <ShowWhen when={actionLabel}>
          <Button variant="text" onClick={actionHandler}>
            {actionLabel}
          </Button>
        </ShowWhen>
        <ShowWhen when={isLocked}>
          <span className="icon-[solar--lock-keyhole-line-duotone] text-black/50" />
        </ShowWhen>
      </As>
      <Divider className="last:hidden" />
    </Fragment>
  );
};
