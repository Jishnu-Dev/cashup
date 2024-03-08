import { Fragment } from "react";
import MerchantBanks from "@/components/profile/MerchantBanks";
import MerchantContacts from "@/components/profile/MerchantContacts";
import MerchantLicenses from "@/components/profile/MerchantLicenses";
import MerchatDetails from "@/components/profile/MerchantDetails";
import ProfileHero from "@/components/profile/ProfileHero";

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
  return (
    <Fragment>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MerchatDetails />
        <MerchantBanks />
        <MerchantContacts />
        <MerchantLicenses />
      </div>
    </Fragment>
  );
};
