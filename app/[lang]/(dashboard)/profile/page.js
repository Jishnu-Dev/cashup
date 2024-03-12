"use client";

import { Fragment } from "react";
import MerchantBanks from "@/components/profile/MerchantBanks";
import MerchantContacts from "@/components/profile/MerchantContacts";
import MerchantLicenses from "@/components/profile/MerchantLicenses";
import ProfileHero from "@/components/profile/ProfileHero";
import TabMerchantDetails from "@/components/profile/TabMerchantDetails";
import { useSearchParams } from "next/navigation";

// import UserAvatar from "@/components/layout/UserAvatar";

export const profileTabs = [
  {
    id: "basic-info",
    label: "Basic Info",
    icon: "icon-[solar--document-text-outline]",
    Component: TabMerchantDetails,
  },
  {
    id: "business",
    label: "Business",
    icon: "icon-[solar--case-round-line-duotone]",
    Component: TabMerchantDetails,
  },
  {
    id: "security",
    label: "Security",
    icon: "icon-[solar--shield-minimalistic-line-duotone]",
    Component: TabMerchantDetails,
  },
  {
    id: "banks",
    label: "Banks",
    icon: "icon-[solar--shield-minimalistic-line-duotone]",
    Component: TabMerchantDetails,
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: "icon-[solar--shield-minimalistic-line-duotone]",
    Component: TabMerchantDetails,
  },
  {
    id: "licenses",
    label: "Licenses",
    icon: "icon-[solar--shield-minimalistic-line-duotone]",
    Component: TabMerchantDetails,
  },
];

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <ProfileHero />
      <ProfileTabBody />
    </div>
  );
}

const ProfileTabBody = () => {
  const searchParams = useSearchParams();
  // If tab present in query param, using it.
  // First tab in tabs array otherwise.
  const tab = searchParams.get("tab") ?? profileTabs[0]?.id;

  return (
    <Fragment>
      {profileTabs.map(({ id, label, Component }) => (
        <div
          role="tabpanel"
          hidden={id !== tab}
          id={`profile-tabpanel-${id}`}
          aria-labelledby={`profile-tab-${id}`}
        >
          {<Component />}
        </div>
      ))}

      {/* <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MerchatDetails />
        <MerchantBanks />
        <MerchantContacts />
        <MerchantLicenses />
      </div> */}
    </Fragment>
  );
};
