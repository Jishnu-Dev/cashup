import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="h-[calc(100vh-108px)] w-full bg-primary relative">
      <Image
        fill
        priority
        loading="eager"
        alt="infoperformance"
        src="/images/home-hero-banner.jpg"
        className="object-cover object- md:object-center"
        sizes="100vw"
      />
      <div
        className="absolute max-md:left-0 md:top-0 bottom-0 right-10 h-max my-auto w-full md:w-1/2 bg-white/80 flex flex-col justify-center 
        gap-6 p-7 md:p-14 max-md:border-l-8 md:border-r-8 border-primary backdrop-filter backdrop-blur-sm bg-opacity-10"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        <h2
          className="text-black font-medium text-xl md:text-5xl uppercase"
          data-aos="fade-up"
          data-aos-delay={0}
        >
          Get <span className="text-primary">cashback </span>
          for every purchase
        </h2>
        <p
          className="md:leading-relaxed"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          We make it easier for you to do what you do best. Purpose-built for
          the enterprise, our AI will transform business performance and
          automate complexity at scale, while paving the way for better
          experiences that impact the bottom-line.
        </p>
        <Button className="group" data-aos="fade-up">
          <div className="flex gap-6">
            Explore
            <ArrowRight className="group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
          </div>
        </Button>
      </div>
    </section>
  );
}
