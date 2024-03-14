"use client";

import Card from "@mui/material/Card";
import { MerchantProfileContext } from "./ProfileContext";
import ProfilePinUpdateModal from "@/components/profile/ProfilePinUpdateModal";
import UserAvatar from "@/components/layout/UserAvatar";
import { useContext } from "react";

export default function ProfileHero() {
  const { merchantData } = useContext(MerchantProfileContext);
  const { merchant_name, email_address } = merchantData;
  console.log("merchantData:", merchantData);
  return (
    <Card>
      <div className="rounded-2xl overflow-hidden">
        <div className="p-10 h-full flex justify-center items-center bg-[url('/images/illust/bg-stacked-waves.svg')] bg-cover bg-no-repeat">
          {/* Green Box */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="p-1 rounded-full border-2 border-white/60 shadow-xl">
              <UserAvatar size={96} name={merchant_name} />
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold text-white">{merchant_name}</h2>
              <small className="lowercase">{email_address}</small>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
