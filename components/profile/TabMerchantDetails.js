"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import { useRouter } from "@/navigation";

export default function MerchantDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-5">
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
          <ul>
            {accountInfos.map(({ label, value }, i) => (
              <li
                key={label}
                className="grid grid-flow-row gap-1 border-b last:border-none py-4"
              >
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
        avatar={<CardTitleIcon icon="icon-[solar--document-text-outline]" />}
      />
      <CardContent>
        <div className="h-full flex flex-col justify-between">
          <ul>
            {accountInfos.map(({ label, value }, i) => (
              <li
                key={label}
                className="grid grid-flow-row gap-1 border-b last:border-none py-4"
              >
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
