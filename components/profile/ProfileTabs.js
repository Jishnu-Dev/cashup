"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "@/navigation";

import { Card } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabMerchantBanks from "@/components/profile/TabMerchantBanks";
import TabMerchantContacts from "@/components/profile/TabMerchantContacts";
import TabMerchantDetails from "@/components/profile/TabMerchantDetails";
import TabMerchantLicenses from "@/components/profile/TabMerchantLicenses";
import Tabs from "@mui/material/Tabs";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

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

  return (
    <Card>
      <Tabs
        className="px-5 pt-2.5"
        value={currentTab}
        onChange={handleChange}
        aria-label="User profile sections"
      >
        {profileTabs.map(({ id, label, icon }) => (
          <Tab
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
    </Card>
  );
}
