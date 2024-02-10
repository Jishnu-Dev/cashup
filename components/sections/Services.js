import { Cloud, DatabaseZap, Rocket, UserRoundCheck } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Robust Your Digital Marketing Campaigns",
      Icon: DatabaseZap,
      desc: "Our low-code/no-code IDP platform delivers pre-trained AI document processing skills that can understand your documents within seconds. It delivers 90% or higher recognition accuracy right out of the box for all your documents.",
    },
    {
      title: "Increase Your Conversions Sales Funnel Creation",
      Icon: Cloud,
      desc: "Our low-code/no-code IDP platform delivers pre-trained AI document processing skills that can understand your documents within seconds. It delivers 90% or higher recognition accuracy right out of the box for all your documents.",
    },
    {
      title: "See Results With Marketing Automation",
      Icon: Rocket,
      desc: "Use intelligent document processing to expedite invoice processing to enable you to do more with less. There’s no type of invoice we can’t handle—any language, any format, any structure.",
    },
    {
      title: "Witness Prompt Customer Support",
      Icon: UserRoundCheck,
      desc: "Meet your customers’ expectations by offering frictionless, accurate, and accessible ways to submit and exchange personal data to decrease customer churn and increase customer retention.",
    },
  ];
  return (
    <section className="container section-spacing">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {services.map(({ title, Icon, desc }, i) => (
          <li
            key={title}
            className="grid grid-flow-row gap-2"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <Icon size={42} />
            <h4 className="text-2xl font-light w-full md:w-8/12">{title}</h4>
            <p>{desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
