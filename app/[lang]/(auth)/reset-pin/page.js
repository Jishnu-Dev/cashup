import CashupLogo from "@/components/ui/CashupLogo";
import OnboardingPinUpdateForm from "@/components/forms/OnboardingPinUpdateForm";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";

export const metadata = {
  title: "Reset PIN",
  description: "Restore access to your merchant account by reseting the pin",
};

export default function Page({ params: { lang } }) {
  return (
    <TwoColumnLayout
      background="bg-wave-scene-2.svg"
      illustration="authentication-flatline.svg"
    >
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <CashupLogo />
        <OnboardingPinUpdateForm />
      </div>
    </TwoColumnLayout>
  );
}
