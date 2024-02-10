import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomeLead() {
  return (
    <section className="flex flex-col md:flex-row w-full">
      {/* Blog #1 */}
      <div
        className="container w-full md:w-6/12 h-80 bg-red-800 flex flex-col justify-between gap-8 py-14"
        data-aos="fade-up"
      >
        <p className="text-white font-light text-4xl">
          Leader in the 2023 Gartner® Magic Quadrant™ for Process Mining Tools
        </p>
        <CTALink link="https://nextjs.org/" />
      </div>

      {/* Block #2 */}
      <div
        className="container w-full md:w-3/12 h-80 bg-red-600 flex flex-col justify-between gap-8 py-14"
        data-aos="fade-up"
        data-aos-delay={200}
      >
        <p className="text-white text-lg font-light">
          Leader in Everest Group IDP PEAK Matrix Assessment 2023
        </p>
        <CTALink link="https://nextjs.org/" />
      </div>

      {/* Block #3 */}
      <div
        className="container w-full md:w-3/12 h-80 bg-red-500 flex flex-col justify-between gap-8 py-14"
        data-aos="fade-up"
        data-aos-delay={300}
      >
        <p className="text-white text-lg font-light">
          #1 in Quadrant Knowledge Solutions’ 2022 SPARK Matrix for Intelligent
          Document Processing
        </p>
        <CTALink link="https://nextjs.org/" />
      </div>
    </section>
  );
}

const CTALink = ({ link, label = "Read the report" }) => (
  <Link
    href={link}
    target="_blank"
    className="text-white flex gap-2 items-center hover:underline group"
  >
    {label}{" "}
    <ArrowRight className="group-hover:translate-x-2 transition-all ease-in-out duration-500" />
  </Link>
);
