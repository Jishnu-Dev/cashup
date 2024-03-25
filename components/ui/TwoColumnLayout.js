"use client";

import Image from "next/image";
import Link from "next/link";
import ShowWhen from "./ShowWhen";

const currentYear = new Date().getFullYear();

export default function TwoColumnLayout({
  children,
  title = "Cashup",
  lead = "Empowering cashback and passive income.",
  background = "bg-scene-default.svg",
  illustration,
}) {
  return (
    <section className="h-screen max-h-screen grid grid-cols-12">
      <section className="col-span-12 lg:col-span-5">{children}</section>
      <section
        className="relative hidden lg:col-span-7 h-full w-full border-l lg:flex flex-col justify-center items-center bg-cover bg-no-repeat bg-white"
        style={{
          backgroundImage: `url(/images/illust/${background})`,
        }}
      >
        {/* <ShowWhen when={illustration}>
          <Image
            src={`/images/illust/${illustration}`}
            alt="Cashup"
            width={600}
            height={600}
          />
        </ShowWhen> */}
        <div className="absolute bottom-3 w-full p-10 mr-auto mix-blend-multipl mt-auto">
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
