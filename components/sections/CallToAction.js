import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="container section-spacing grid grid-flow-row gap-2">
      <SectionTitle />
      <SectionBody />
    </section>
  );
}

const SectionTitle = () => (
  <div
    className="w-full h-max bg-primary flex flex-col md:flex-row gap-8 md:gap-0 justify-start md:justify-between items-start md:items-center p-8"
    data-aos="fade-up"
  >
    <h4 className="text-white text-2xl">The Intelligent Enterprise</h4>
    <Link
      href="/jishnu/contact-us"
      className="flex gap-3 items-center text-white group"
    >
      Contact Us
      <ArrowRight className="group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
    </Link>
  </div>
);

const SectionBody = () => (
  <div
    className="bg-gray-200 grid grid-cols-1 md:grid-cols-2"
    data-aos="fade-up"
    data-aos-delay={200}
  >
    <div className="p-8 flex flex-col gap-8">
      <h6 className="text-primary">Exceptional CX</h6>
      <h5 className="text-xl md:text-3xl font-light">
        Do You Want To Lead Your Industry From The Front With Exceptional CX?
      </h5>
      <p>
        Customers from all around the globe visit your business every day to
        meet their needs — eliciting real-world experience, sentiments, and
        perceptions. Achieving the ideal customer experience is your job, but
        complying with every individual customer’s unique expectations is a
        complex process. There is no universal customer experience approach.
      </p>
      <Button kind="secondary" className="mt-14">
        Book a demo
      </Button>
    </div>
    {/* Right cover */}
    <div className="relative">
      <Image
        fill
        loading="eager"
        alt="infoperformance"
        className="object-cover"
        src="/images/cta-cover.jpg"
        sizes="100vw"
      />
    </div>
  </div>
);
