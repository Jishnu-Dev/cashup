"use client";

import ShowWhen from "@/components/ui/ShowWhen";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";
import UpdateDefaultPinForm from "@/components/forms/UpdateDefaultPinForm";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState(1); // 1: Welcome, 2: Update default pin

  return (
    <TwoColumnLayout
      background="bg-wave-scene-3.svg"
      illustration="pin-mobile-flatline.svg"
    >
      <div className="h-full container flex justify-center items-center">
        <ShowWhen when={step === 1}>
          <UpdateDefaultPinForm />
        </ShowWhen>
      </div>
    </TwoColumnLayout>
  );
}
