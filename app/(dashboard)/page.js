"use client";

import { Card, CardActions, CardContent, Typography } from "@mui/material";

import BarChart from "@/components/dummy/BarChart";
import { CountUp } from "use-count-up";
import Image from "next/image";
import NivoBumpChart from "@/components/dummy/NivoBumpChart";
import NivoPieChart from "@/components/dummy/NivoPieChart";
import ProfileVerifications from "@/components/dashboard/ProfileVerifications";

export default function Page() {
  return (
    <section className="grid grid-flow-row gap-6">
      <div className="grid grid-cols-2 gap-6">
        <Greenting
          title="Check out today's statistics"
          lead="Hello there, Welcome back to the dashboard. <br />
              Take a look at today's overview."
          img="greetings-hero.svg"
          cta="Explore"
        />
        <NivoPieChart />
      </div>
      <Grid />
    </section>
  );
}

const Greenting = ({ title, lead, img, cta = "Learn More" }) => {
  return (
    <Card className="bg-gradient-to-r from-sky-600 to-emerald-500">
      <CardContent className="flex">
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
            <button className="bg-transparent hover:bg-white hover:text-black text-white border border-white p-3 rounded-full px-10 mt-16">
              {cta}
            </button>
          </div>
        </div>
        <Image
          priority
          width={300}
          height={300}
          alt="Welcome"
          src={`/images/${img}`}
          style={{ height: "auto" }}
        />
      </CardContent>
    </Card>
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
      <BarChart />
      <Sales />
      <ProfileVerifications />
      <NivoBumpChart />
      {/* <Greenting
        title="Check out today's sales"
        lead="Check out the sales of last week"
        img="coins-stack.svg"
        cta="Explore"
      /> */}
    </div>
  );
};

const Sales = () => {
  const sampleData = [
    {
      value: 27654,
      label: "Total Sales",
      icon: "icon-[solar--dollar-line-duotone]",
    },
    {
      value: 32,
      label: "Refunds",
      icon: "icon-[solar--cash-out-line-duotone]",
    },
    {
      value: 3423,
      label: "Earnings",
      icon: "icon-[solar--money-bag-linear]",
    },
  ];

  const ThreeColumn = () => (
    <div className="w-full grid grid-cols-3 gap-4">
      {sampleData.map(({ value, label, icon }) => (
        <Card
          key={label}
          className="bg-gradient-to-tr from-emerald-500 to-emerald-200"
        >
          <CardContent className="h-full text-white flex flex-col justify-between">
            <span className={`${icon} text-4xl`} />
            <div>
              <h4 className="text-3xl font-semibold">
                <CountUp
                  isCounting
                  end={value}
                  duration={2}
                  formatter={(value) => value.toLocaleString()}
                />
              </h4>
              <p>{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const TwoColumn = () => (
    <div className="w-full grid grid-cols-2 gap-4">
      {sampleData.slice(0, 2).map(({ value, label, icon }) => (
        <Card
          key={label}
          className="bg-[url('/images/layered-waves.svg')] bg-no-repeat bg-contain bg-bottom"
        >
          <CardContent className="text-black grid grid-flow-row gap-6">
            <span className={`${icon} text-4xl text-primary`} />
            <div>
              <h4 className="text-3xl font-semibold text-primary">
                <CountUp isCounting end={value} duration={3} />
              </h4>
              <p className="text-primary/80">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="grid grid-flow-row grid-rows-2 gap-4">
      <ThreeColumn />
      <TwoColumn />
    </div>
  );
};
