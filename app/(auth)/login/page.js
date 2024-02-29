"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";

export default function Page() {
  const illustrationOptions = [
    "ranking-two-color.svg",
    "finance-app-flatline.svg",
    "google-ad-flatline.svg",
    "authentication-two-color.svg",
    "analysis-flatline.svg",
  ];

  const [randomIllustration, setRandomIllustration] = useState(
    illustrationOptions[0]
  );

  useEffect(() => {
    setRandomIllustration(
      illustrationOptions[
        Math.floor(Math.random() * illustrationOptions.length)
      ]
    );
  }, []);

  return (
    <TwoColumnLayout illustration={randomIllustration}>
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Logo />
        <LoginForm />
      </div>
    </TwoColumnLayout>
  );
}

const Logo = () => (
  <Image
    priority
    width={200}
    height={200}
    // style={{ width: "auto", height: "auto" }}
    alt="Cashup logo"
    src="/images/cashup-logo-colored.png"
  />
);
