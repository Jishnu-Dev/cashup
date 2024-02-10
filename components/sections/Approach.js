import { BarChart2, Heart, Shuffle, Verified } from "lucide-react";

export default function Approach() {
  return (
    <section className="container section-spacing grid grid-flow-row gap-14">
      <h5 className="text-2xl md:text-3xl" data-aos="fade-up">
        Our <span className="text-primary">Unique Approach</span> To Improving
        Your CX
      </h5>
      <Approaches />
    </section>
  );
}

const Approaches = () => {
  const approachMethods = [
    {
      title: "Trusted",
      lead: "Over 10,000 enterprise customers, including many of the Fortune 500, trust ABBYY with their business-critical documents. The analyst community continues to name ABBYY as the market leader in intelligent document processing.",
      Icon: Verified,
    },
    {
      title: "Innovative",
      lead: "InfoP modernized the IDP market with its low-code / no-code platform. After 30 years, we are unmatched in the number of document types, formats, and languages we support.",
      Icon: Shuffle,
    },
    {
      title: "Transformative",
      lead: "Going beyond expectations requires extraordinary effort. To make it happen, we obsessively serve our clientele with our digitally empowered and result-driven surveillance. ",
      Icon: BarChart2,
    },
  ];
  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {approachMethods.map(({ title, lead, Icon }, i) => (
        <li key={title} data-aos="fade-up" data-aos-delay={i * 100}>
          <div className="grid grid-flow-row gap-4">
            <div data-aos="fade-up" data-aos-delay={i * 60}>
              <Icon
                size={62}
                className="text-primary border border-primary/50 p-3 rounded-full"
              />
            </div>
            <h6
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="text-xl md:text-2xl text-primary"
            >
              {title}
            </h6>
            <p data-aos="fade-up" data-aos-delay={i * 220}>
              {lead}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
