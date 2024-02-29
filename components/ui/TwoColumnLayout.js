"use client";

import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function TwoColumnLayout({
  children,
  background = "bg-wave-scene.svg",
  illustration = "finance-app-flatline.svg",
  title = "Cashup",
  lead = "Empowering cashback and passive income.",
}) {
  return (
    <section className="h-full grid grid-cols-12">
      <section className="col-span-12 lg:col-span-5">{children}</section>
      <section
        className="hidden lg:col-span-7 h-full w-full border-l lg:flex flex-col justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(/images/illust/${background})`,
        }}
      >
        <Image
          src={`/images/illust/${illustration}`}
          alt="Cashup"
          width={1200}
          height={1200}
        />
        <div className="w-full p-10 mr-auto relative mix-blend-multiply">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-blue-900 via-blue-500 to-blue-400">
            {title}
          </h2>
          <p>{lead}</p>
          <p className="text-xs">{`All rights reserved. © ${currentYear} Cashup.`}</p>
          <Link
            className="underline text-xs hover:opacity-50"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </section>
    </section>
  );
}
