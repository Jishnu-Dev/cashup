"use client";

import { Fragment, useEffect, useState } from "react";

import ProfileHero from "@/components/profile/ProfileHero";
import TabMerchantBanks from "@/components/profile/TabMerchantBanks";
import TabMerchantContacts from "@/components/profile/TabMerchantContacts";
import TabMerchantDetails from "@/components/profile/TabMerchantDetails";
import TabMerchantLicenses from "@/components/profile/TabMerchantLicenses";
import { apiGetMerchantProfile } from "@/api";
import { getMerchantId } from "@/lib/authenticator";
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
    id: "banks",
    label: "Banks",
    icon: "icon-[solar--money-bag-outline]",
    Component: TabMerchantBanks,
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: "icon-[solar--user-id-outline]",
    Component: TabMerchantContacts,
  },
  {
    id: "licenses",
    label: "Licenses",
    icon: "icon-[solar--document-add-outline]",
    Component: TabMerchantLicenses,
  },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  async function fetchMerchantProfile() {
    try {
      const merchantId = getMerchantId();
      const resp = await apiGetMerchantProfile(merchantId);
      console.log("RESP", resp);
    } catch (e) {
      console.dir(e);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchMerchantProfile();
  }, []);

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
