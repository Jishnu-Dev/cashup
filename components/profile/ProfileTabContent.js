"use client";

import { Fragment } from "react";
import { profileTabs } from "@/components/profile/ProfileTabs";
import { useSearchParams } from "next/navigation";

export default function ProfileTabContent() {
  const searchParams = useSearchParams();
  // If tab present in query param, using it. First tab in tabs array otherwise.
  const tab = searchParams.get("tab") ?? profileTabs[0]?.id;

  // const merchantData = useContext(MerchantProfileContext);
  // console.log("MERCH", merchantData);

  return (
    <Fragment>
      {profileTabs.map(({ id, label, Component }) => (
        <div
          key={id}
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
}
