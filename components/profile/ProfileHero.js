"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "@/navigation";

import Card from "@mui/material/Card";
import ProfilePinUpdateModal from "@/components/profile/ProfilePinUpdateModal";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import UserAvatar from "@/components/layout/UserAvatar";
import classNames from "classnames";
import { profileTabs } from "@/app/[lang]/(dashboard)/profile/page";
import { useSearchParams } from "next/navigation";

export default function ProfileHero() {
  return (
    <Card>
      <div className="rounded-2xl overflow-hidden">
        <ProfileHeroBanner />
        {/* Profile tabs */}
        <ProfileTabs />
      </div>
    </Card>
  );
}

const ProfileHeroBanner = () => (
  <div
    className="p-10 h-full flex justify-center items-center
bg-[url('/images/illust/bg-stacked-waves.svg')] bg-cover bg-no-repeat"
  >
    {/* Green Box */}
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="p-1 rounded-full border-2 border-white/60 shadow-xl">
        <UserAvatar size={96} name="Acme Doddas" />
      </div>
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold text-white">Acme Doddas</h2>
        <small>Admin • acme@cashup.com • Merchant Id: WHRXSR854</small>
      </div>
    </div>
  </div>
);

const ProfileTabs = () => {
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
  );
};
