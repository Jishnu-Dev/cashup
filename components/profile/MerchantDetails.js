"use client";

import { Button } from "@mui/material";
import Card from "@/components/ui/Card";
import ProfileEditModal from "./ProfileEditModal";
import { useState } from "react";

export default function MerchatDetails() {
  const accountInfos = [
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

  // Edit Modal
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);

  return (
    <Card title="Merchant Details" lead="View or update your account details">
      <div className="h-full flex flex-col gapp-3 justify-between">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
          {accountInfos.map(({ label, value }, i) => (
            <li key={label} className="grid grid-flow-row gap-1">
              <p className="text-black/60 text-sm">{label}</p>
              <p className="text-black font-medium">{value}</p>
            </li>
          ))}
        </ul>
        <Button
          disableElevation
          className="w-max"
          variant="outlined"
          onClick={() => {
            setIsProfileEditModalOpen(true);
          }}
          startIcon={<span className="icon-[solar--pen-line-duotone]" />}
        >
          Edit Details
        </Button>
        <ProfileEditModal
          isOpen={isProfileEditModalOpen}
          setIsOpen={setIsProfileEditModalOpen}
        />
      </div>
    </Card>
  );
}
