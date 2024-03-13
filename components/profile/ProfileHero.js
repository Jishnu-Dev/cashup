import Card from "@mui/material/Card";
import ProfilePinUpdateModal from "@/components/profile/ProfilePinUpdateModal";
import ProfileTabs from "@/components/profile/ProfileTabs";
import UserAvatar from "@/components/layout/UserAvatar";

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
