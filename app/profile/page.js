import { Button } from "@mui/material";
import Card from "@/components/ui/Card";
import UserAvatar from "@/components/layout/UserAvatar";

export default function Page() {
  return (
    <div className="w-full grid grid-flow-row gap-10">
      <HeroBanner />
      <ProfileGrid />
      <ProfileGrid />
    </div>
  );
}

const HeroBanner = () => {
  return (
    <Card blank>
      <div className="w-full h-80 rounded-2xl default-gradient">
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="p-1 rounded-full border-2 border-white/60">
              <UserAvatar size={96} name="Acme Doddas" />
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold text-white">Acme Doddas</h2>
              <p>Admin • acme@cashup.com</p>
              <p className="font-medium">Merchant Id: WHRXSR854</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProfileGrid = () => {
  return (
    <div className="w-full grid grid-cols-2">
      <AccountInfo />
    </div>
  );
};

const AccountInfo = () => {
  const accountInfos = [
    { label: "Name", value: "Acme Dodas" },
    { label: "Email", value: "merchant@cashup.com" },
    {
      label: "Address",
      value: "PO Box 12, Shake sayed road, Dubai, United Arab Emirates",
    },
    { label: "Branch Type", value: "Merchant" },
    { label: "Telephone", value: "+971 583459876" },
    { label: "Status", value: "Active" },
  ];

  return (
    <Card title="Account Info" lead="View or update your account details">
      <div className="grid grid-flow-row gap-8">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
          {accountInfos.map(({ label, value }, i) => (
            <li key={label} className="grid grid-flow-row gap-1">
              <p className="text-black/60 text-sm">{label}</p>
              <p className="text-black font-medium">{value}</p>
            </li>
          ))}
        </ul>
        <Button
          disableElevation
          className="w-max"
          variant="outlined"
          startIcon={<span class="icon-[solar--pen-line-duotone]" />}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};
