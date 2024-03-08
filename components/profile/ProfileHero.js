import { Button, Card } from "@mui/material";

import { Fragment } from "react";
import ProfilePinUpdateModal from "@/components/profile/ProfilePinUpdateModal";
import UserAvatar from "@/components/layout/UserAvatar";
import classNames from "classnames";

export default function ProfileHero() {
  return (
    <Card>
      <div className="rounded-2xl overflow-hidden">
        <div
          className="p-10 h-full flex justify-center items-center
        bg-[url('/images/illust/bg-stacked-waves.svg')] bg-cover bg-no-repeat
        "
        >
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
        <StatisticsBar />
      </div>
    </Card>
  );
}

const StatisticsBar = () => {
  const statistics = [
    {
      label: "Contacts",
      value: 983,
      icon: "icon-[solar--user-id-line-duotone]",
    },
    {
      label: "Licenses",
      value: 12,
      icon: "icon-[solar--document-add-line-duotone]",
    },
    {
      label: "Accounts",
      value: 4,
      icon: "icon-[solar--buildings-2-line-duotone]",
    },
  ];

  return (
    <Fragment>
      <div className="flex justify-between p-5 bg-white">
        <div className="flex gap-6 items-center">
          {statistics.map(({ label, value, icon }, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 items-center text-center"
            >
              <span className={classNames("text-2xl", icon)} />
              <span>
                <p className="font-medium text-2xl">{value}</p>
                <p>{label}</p>
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center items-center">
          <Button className="flex gap-3" variant="contained">
            Update pin
            <span className="text-2xl icon-[solar--key-bold-duotone]" />
          </Button>
        </div>
      </div>
      <ProfilePinUpdateModal />
    </Fragment>
  );
};
