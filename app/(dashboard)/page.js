import { Card, CardContent, CardHeader } from "@mui/material";

import CardTitleIcon from "@/components/ui/CardTitleIcon";
import Image from "next/image";

export default function Page() {
  return (
    <section className="grid grid-flow-row gap-12">
      <div className="grid grid-cols-2 gap-4">
        <Greenting
          title="Check out today's statistics"
          lead="Hello there, Welcome back to the dashboard. <br />
              Take a look at today's overview."
          img="greetings-hero.svg"
          cta="Explore"
        />
        <Greenting
          title="Check out today's earnings"
          lead="Hello there, Welcome back to the dashboard. <br />
              Take a look at today's overview."
          img="coins-stack.svg"
          cta="See Earnings"
        />
      </div>
      <Grid />
    </section>
  );
}

const Greenting = ({ title, lead, img, cta = "Learn More" }) => {
  return (
    <div
      className="w-full rounded-2xl flex justify-between shadow p-6
      bg-gradient-to-r from-sky-600 to-emerald-500
    "
    >
      <div className="flex flex-col gap-8">
        <Clock />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1
              className="text-4xl font-bold text-white"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              className="text-white/80"
              dangerouslySetInnerHTML={{ __html: lead }}
            />
          </div>
          <button className="bg-transparent hover:bg-white hover:text-black text-white border border-white p-3 rounded-full">
            {cta}
          </button>
        </div>
      </div>
      <Image src={`/images/${img}`} alt="Welcome" width={250} height={250} />
    </div>
  );
};

const Clock = () => {
  const presentDateTime = new Date().toLocaleString();
  return (
    <div className="flex gap-2 items-center">
      <p className="text-white">{presentDateTime}</p>
    </div>
  );
};

const Grid = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <Card>
          <CardHeader
            title="Lorem ipsum"
            subheader="Lorem ipsum dolor sit amet"
            avatar={
              <CardTitleIcon icon="icon-[solar--course-up-line-duotone]" />
            }
          />
          <CardContent>
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
