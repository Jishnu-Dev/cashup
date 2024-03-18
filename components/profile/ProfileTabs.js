"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "@/navigation";

import { Card } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabMerchantBanks from "@/components/profile/TabMerchantBanks";
import TabMerchantContacts from "@/components/profile/TabMerchantContacts";
import TabMerchantInfo from "@/components/profile/TabMerchantInfo";
import TabMerchantLicenses from "@/components/profile/TabMerchantLicenses";
import Tabs from "@mui/material/Tabs";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

// TODO: FIX TABS

export const profileTabs = [
  {
    id: "basic-info",
    label: "Basic Info",
    icon: "icon-[solar--document-text-outline]",
    Component: TabMerchantInfo,
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

export default function ProfileTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const [currentTab, setCurrentTab] = useState(profileTabs[0].id);
  const handleChange = (event, value) => {
    const queryWithTabName = createQueryString("tab", value);
    router.push(pathname + "?" + queryWithTabName);
    setCurrentTab(value);
  };

  // If tab present in query param, using it. First tab in tabs array otherwise.
  const tab = searchParams.get("tab") ?? profileTabs[0]?.id;

  return (
    <Card className="mt-10">
      <Tabs
        className="px-5 pt-2.5"
        value={currentTab}
        onChange={handleChange}
        aria-label="User profile sections"
      >
        {profileTabs.map(({ id, label, icon }) => (
          <Tab
            key={id}
            id={id}
            label={
              <div className="flex gap-3 items-end">
                <span className={classNames("text-xl", icon)} />
                {label}
              </div>
            }
            value={id}
          />
        ))}
      </Tabs>

      {profileTabs.map(({ id, Component }) => (
        <div
          key={id}
          role="tabpanel"
          hidden={id !== tab}
          id={`profile-tabpanel-${id}`}
          aria-labelledby={`profile-tab-${id}`}
          className="pt-4"
        >
          {<Component />}
        </div>
      ))}
    </Card>
  );
}
