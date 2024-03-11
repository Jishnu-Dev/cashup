"use client";

import ProfileHero, { profileTabs } from "@/components/profile/ProfileHero";

import { Fragment } from "react";
import MerchantBanks from "@/components/profile/MerchantBanks";
import MerchantContacts from "@/components/profile/MerchantContacts";
import MerchantLicenses from "@/components/profile/MerchantLicenses";
import MerchatDetails from "@/components/profile/MerchantDetails";
import { useSearchParams } from "next/navigation";

// import UserAvatar from "@/components/layout/UserAvatar";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <ProfileHero />
      <ProfileGrid />
    </div>
  );
}

const ProfileGrid = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? profileTabs[0]?.id;

  return (
    <Fragment>
      {profileTabs.map(({ id, label }) => (
        <div
          role="tabpanel"
          hidden={id !== tab}
          id={`profile-tabpanel-${id}`}
          aria-labelledby={`profile-tab-${id}`}
        >
          {/* {id === tab && <p>{label}</p>} */}
          {label}
        </div>
      ))}

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MerchatDetails />
        <MerchantBanks />
        <MerchantContacts />
        <MerchantLicenses />
      </div>
    </Fragment>
  );
};
