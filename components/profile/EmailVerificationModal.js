import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";

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

  return (
    <Dialog fullWidth open={isModalOpen} onClose={closeModal}>
      <DialogTitle>Verify Your Email</DialogTitle>
      <DialogContent className="text-center flex flex-col justify-center items-center gap-4">
        <span className="icon-[solar--check-circle-line-duotone] text-8xl text-primary" />
        <p>
          An email verification link has been sent to your email address. <br />
          Please click the link to verify your email address.
        </p>
        <Button variant="outlined" className="w-full" onClick={closeModal}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
