"use client";

import Card from "@mui/material/Card";
import ShowWhen from "@/components/ui/ShowWhen";
import Skeleton from "@mui/material/Skeleton";
import UserAvatar from "@/components/layout/UserAvatar";
import { useMerchantStore } from "@/store/merchant-store-provider";
import { useStore } from "@/store/use-store";

// import ProfilePinUpdateModal from "@/components/profile/ProfilePinUpdateModal";

export default function ProfileHero() {
  const merchantData = useStore(
    useMerchantStore,
    (state) => state.merchantData
  );

  return (
    <Card>
      <div className="rounded-2xl overflow-hidden">
        <div className="p-10 h-full flex justify-center items-center bg-[url('/images/illust/bg-stacked-waves.svg')] bg-cover bg-no-repeat">
          <ShowWhen when={merchantData}>
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="p-1 rounded-full border-2 border-white/60 shadow-xl">
                <UserAvatar size={96} name={merchantData?.merchant_name} />
              </div>
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold text-white">
                  {merchantData?.merchant_name}
                </h2>
                <small className="lowercase">
                  {merchantData?.email_address}
                </small>
              </div>
            </div>
          </ShowWhen>
          <ShowWhen when={!merchantData}>
            <LoadingSkelt />
          </ShowWhen>
        </div>
      </div>
    </Card>
  );
}

const LoadingSkelt = () => (
  <div className="flex flex-col gap-1 justify-center items-center">
    <Skeleton variant="circular" width={100} height={100} />
    <Skeleton variant="text" width={200} />
    <Skeleton variant="text" width={150} />
  </div>
);
