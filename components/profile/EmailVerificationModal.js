import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ShowWhen from "@/components/ui/ShowWhen";
import { apiSendMailVerificationLink } from "@/api";
import { getMerchantId } from "@/lib/authenticator";
import { useMerchantStore } from "@/store/merchant-store-provider";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store/use-store";

export default function EmailVerificationModal() {
  // Handling open state of modal
  const queryParamKey = "modal";
  const queryParamValue = "email-verify";

  const router = useRouter();
  const searchParams = useSearchParams();
  const isModalOpen = searchParams.get(queryParamKey) === queryParamValue;
  const closeModal = () => {
    router.back();
  };

  const merchantData = useStore(
    useMerchantStore,
    (state) => state.merchantData
  );

  console.log("merchantData:", merchantData);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function sendMailVerificationLink() {
      try {
        const merchantId = getMerchantId();
        const payload = {
          in_merchant_id: merchantId,
          in_merchant_email: merchantData?.email_address,
          in_url: "http://localhost:3000/verify",
        };
        const resp = await apiSendMailVerificationLink(payload);
        console.log("resp:", resp);
      } catch (e) {
        console.dir(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (isModalOpen) sendMailVerificationLink();
  }, [isModalOpen]);

  return (
    <Dialog
      fullWidth
      open={isModalOpen}
      onClose={!isLoading ? closeModal : null}
    >
      <DialogTitle>Verify Your Email</DialogTitle>
      <DialogContent>
        <ShowWhen when={isLoading}>
          <LoadingScreen />
        </ShowWhen>
        <ShowWhen when={!isLoading}>
          <div className="text-center flex flex-col justify-center items-center gap-4">
            <span className="icon-[solar--check-circle-line-duotone] text-8xl text-primary" />
            <p>
              An email verification link has been sent to your email address.
              <br />
              Please click the link to verify your email address.
            </p>
            <Button variant="outlined" className="w-full" onClick={closeModal}>
              Close
            </Button>
          </div>
        </ShowWhen>
      </DialogContent>
    </Dialog>
  );
}

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <CircularProgress />
    <p>Sending email...</p>
  </div>
);
