import ResetPinForm from "@/components/forms/ResetPinForm";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";

export const metadata = {
  title: "Reset Pin",
  description: "Restore access to your merchant account by reseting the pin",
};

export default function Page() {
  return (
    <TwoColumnLayout
      background="bg-wave-scene-2.svg"
      illustration="authentication-flatline.svg"
    >
      <div className="h-full container flex justify-center items-center">
        <ResetPinForm />
      </div>
    </TwoColumnLayout>
  );
}
