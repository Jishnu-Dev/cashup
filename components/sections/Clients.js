import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Clients() {
  const clients = [
    "airbus",
    "airbus-2",
    "ban",
    "bomag",
    "gemo",
    "pentel",
    "tohato",
    "universal",
    "vudu",
  ];

  return (
    <section className="section-spacin mt-12 flex flex-col gap-8">
      <Marquee>
        <ul className="flex items-center gap-14">
          {clients.map((client) => (
            <li key={client} className="first:ml-12">
              <Image
                width={100}
                height={100}
                alt={client}
                src={`/images/clients/${client}.svg`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>
      </Marquee>
      <h2 className="text-2xl font-light text-center" data-aos="fade-up">
        Trusted by
        <span className="text-red-500">{` 1000+ customers `}</span>
        across the globe
      </h2>
    </section>
  );
}
