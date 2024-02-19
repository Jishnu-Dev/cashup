"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useRouter } from "next/navigation";

export default function MerchatDetails() {
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
    <Card variant="outlined">
      <CardHeader
        title="Merchant details"
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
}
