import Card from "@/components/ui/Card";
import MerchantBanks from "@/components/profile/MerchantBanks";
import MerchantContacts from "@/components/profile/MerchantContacts";
import MerchantLicenses from "@/components/profile/MerchantLicenses";
import MerchatDetails from "@/components/profile/MerchantDetails";
import UserAvatar from "@/components/layout/UserAvatar";

export default function Page() {
  return (
    <div className="w-full grid grid-flow-row gap-8">
      <HeroBanner />
      <ProfileGrid />
    </div>
  );
}

const HeroBanner = () => {
  return (
    <Card blank>
      <div className="w-full h-72 rounded-2xl default-gradient">
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="p-1 rounded-full border-2 border-white/60">
              <UserAvatar size={96} name="Acme Doddas" />
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold text-white">Acme Doddas</h2>
              <small>Admin • acme@cashup.com • Merchant Id: WHRXSR854</small>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProfileGrid = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MerchatDetails />
      <MerchantBanks />
      <MerchantContacts />
      <MerchantLicenses />
    </div>
  );
};
