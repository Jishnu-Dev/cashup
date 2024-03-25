import CashupLogo from "@/components/ui/CashupLogo";
import ForgotPinForm from "@/components/forms/ForgotPinForm";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";

export const metadata = {
  title: "Reset PIN",
  description: "Restore access to your merchant account by reseting the pin",
};

export default function Page() {
  return (
    <TwoColumnLayout illustration="authentication-flatline.svg">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <CashupLogo />
        <ForgotPinForm />
      </div>
    </TwoColumnLayout>
  );
}
