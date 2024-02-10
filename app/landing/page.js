import Approach from "@/components/sections/Approach";
import Articles from "@/components/sections/Articles";
import CallToAction from "@/components/sections/CallToAction";
import Clients from "@/components/sections/Clients";
import Featured from "@/components/sections/Featured";
import FooterLead from "@/components/sections/FooterLead";
import HeroLead from "@/components/sections/HeroLead";
import HomeHero from "@/components/sections/HomeHero";
import HomeLead from "@/components/sections/HomeLead";
import Services from "@/components/sections/Services";
import Testimony from "@/components/sections/Testimony";
import { tagline } from "@/lib/constants";

export const metadata = {
  title: `Cashup | ${tagline}`,
  description: tagline,
};

export default function Home() {
  return (
    <section>
      <HomeHero />
      <Clients />
      <HeroLead />
      <Testimony />
      <HomeLead />
      <Services />
      <CallToAction />
      <Approach />
      <Featured />
      <Articles />
      <FooterLead />
    </section>
  );
}
