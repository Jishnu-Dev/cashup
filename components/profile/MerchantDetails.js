"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

export default function MerchantDetails() {
  return (
    <div className="grid grid-flow-row gap-5">
      <CoreAccountInfo />
      <BasicInfo />
    </div>
  );
}

const CoreAccountInfo = () => {
  const router = useRouter();
  const accountInfos = [
    { label: "Email", value: "jishnu@gmail.com" },
    { label: "Mobile", value: "0583069308" },
    { label: "Password PIN", value: "0583069308" },
    { label: "Status", value: "Active" },
  ];

  return (
    <Card>
      <CardHeader
        title="Account Info"
        subheader="View or update your account details"
        // action={
        //   <Button
        //     onClick={() => {
        //       router.push("/profile/edit-profile");
        //     }}
        //     startIcon={<span className="icon-[solar--pen-line-duotone]" />}
        //   >
        //     Edit Details
        //   </Button>
        // }
        avatar={<CardTitleIcon icon="icon-[solar--tuning-2-broken]" />}
      />
      <CardContent>
        <div className="h-full flex flex-col gapp-3 justify-between">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
            {accountInfos.map(({ label, value }, i) => (
              <li key={label} className="grid grid-flow-row gap-1">
                <p className="text-black/60 text-sm">{label}</p>
                <p className="text-black font-medium">{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const BasicInfo = () => {
  const router = useRouter();
  const accountInfos = [
    { label: "Merchant ID", value: "WHRXSR854" },
    { label: "Name", value: "Acme Dodas" },
    { label: "Email", value: "merchant@cashup.com" },
    {
      label: "Address",
      value: "PO Box 12, Shake sayed road, Dubai, United Arab Emirates",
    },
    { label: "Branch Type", value: "Merchant" },
    { label: "Telephone", value: "+971 583459876" },
    { label: "Status", value: "Active" },
  ];

  return (
    <Card>
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
        avatar={<CardTitleIcon icon="icon-[solar--user-circle-broken]" />}
      />
      <CardContent>
        <div className="h-full flex flex-col gapp-3 justify-between">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
            {accountInfos.map(({ label, value }, i) => (
              <li key={label} className="grid grid-flow-row gap-1">
                <p className="text-black/60 text-sm">{label}</p>
                <p className="text-black font-medium">{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
