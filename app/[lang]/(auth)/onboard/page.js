// import { Logo } from "@/app/(auth)/login/page";

import TwoColumnLayout from "@/components/ui/TwoColumnLayout";
import UpdateDefaultPinForm from "@/components/forms/UpdateDefaultPinForm";

export default function Page() {
  return (
    <TwoColumnLayout
      background="bg-wave-scene-3.svg"
      illustration="online-protection-flatline.svg"
    >
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        {/* <Logo /> */}
        <UpdateDefaultPinForm />
      </div>
    </TwoColumnLayout>
  );
}
