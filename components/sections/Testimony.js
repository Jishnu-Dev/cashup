export default function Testimony() {
  return (
    <div className="container section-spacing grid grid-flow-row gap-12 text-center">
      <h4
        className="text-3xl md:text-5xl font-light w-full md:w-8/12 mx-auto"
        data-aos="fade-up"
      >
        Benefit from 20+ years of proven expertise
      </h4>
      <div className="grid grid-flow-row gap-4 w-full md:w-8/12 mx-auto">
        <p data-aos="fade-up" data-aos-delay={100}>
          Only INFOP combines decades of experience with the latest innovations
          in purpose-built AI to transform data from any document, any format,
          any language, into information you need to make timely and accurate
          business decisions.
        </p>
        <p data-aos="fade-up" data-aos-delay={200}>
          Our solutions are designed to deliver immediate and measured value for
          the most complex industry-specific enterprise challenges.{" "}
        </p>
      </div>
    </div>
  );
}
