import Button from "@/components/ui/Button";

export default function FooterLead() {
  return (
    <section className="w-full bg-gray-200 relative overflow-hidden">
      <p className="text-[12rem] font-black text-primary/10" data-aos="fade-up">
        GREEN NEST
      </p>
      <div className="container h-full absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center md:flex-row gap-6 md:gap-0 md:justify-between items-center">
        <h6 className="text-2xl md:text-4xl font-light" data-aos="fade-down">
          Your One-Stop Contact Center and
          <br /> Technology Solution!
        </h6>
        <div className="flex gap-4">
          <Button data-aos="fade-up" data-aos-delay={200}>
            Schedule a demo
          </Button>
          <Button kind="secondary" data-aos="fade-up" data-aos-delay={200}>
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
