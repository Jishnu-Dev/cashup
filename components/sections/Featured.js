import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Featured() {
  return (
    <section className="container section-spacing grid grid-cols-1 md:grid-cols-2">
      <div
        className="p-8 md:p-12 bg-gray-100 flex flex-col justify-between gap-6 md:gap-0"
        data-aos="fade-up"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-500">Featured Event</p>
          <h6 className="text-xl md:text-3xl font-light">
            {`Think 2024 is coming—and we're talking AI for business`}
          </h6>
          <p className="text-light">
            Join us in Jumeirah, 20-24 January for Think 2024, and discover how
            you can scale AI for your business.
          </p>
        </div>
        <Link
          href="https://nextjs.org/"
          target="_blank"
          className="flex gap-2 text-primary hover:underline group"
        >
          Participate
          <ArrowRight className="group-hover:translate-x-2 transition-all duration-200 ease-in-out" />
        </Link>
      </div>
      <div className="h-[30rem] w-full relative" data-aos="fade-down">
        <Image
          fill
          alt="infoperformance"
          className="object-cover"
          src="/images/featured-event-cover.jpg"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
