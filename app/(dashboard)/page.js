"use client";

import { Button, Card, CardContent, CardHeader, Divider } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardTitleIcon from "@/components/ui/CardTitleIcon";
import { CountUp } from "use-count-up";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Fragment } from "react";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers";
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
      <p className="text-white">{"22/02/2024"}</p>
      {/* <p className="text-white">{presentDateTime}</p> */}
    </div>
  );
};

const Grid = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <Sales />
      <ProfileVerifications />
      <NivoBumpChart />
      <Calendar />
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

  const InviteMerhcants = () => (
    <Card>
      <CardContent className="h-full bg-[url('/images/blob-circles.svg')] bg-no-repeat bg-cover bg-right-bottom">
        <div className="h-full flex items-center justify-around gap-4">
          <span className="icon-[solar--shop-2-broken] text-primary text-[6rem]" />
          <div className="grid grid-flow-row gap-3">
            <h3 className="text-2xl font-semibold">
              Invite New Customers
              <sup className="text-4xl text-primary font-bold">+</sup>
            </h3>
            <Button
              variant="contained"
              endIcon={
                <span className="icon-[solar--arrow-right-line-duotone]" />
              }
            >
              Send invitations now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-flow-row grid-rows-2 gap-4">
      <ThreeColumn />
      <InviteMerhcants />
    </div>
  );
};

const Calendar = () => {
  const activities = [
    {
      label: "Collect pendings",
      icon: "icon-[solar--banknote-broken]",
    },
    {
      label: "Contact merchants",
      icon: "icon-[solar--shop-2-line-duotone]",
    },
    {
      label: "Invite merchant",
      icon: "icon-[solar--user-plus-broken]",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Activities Calender"
        subheader="Find your upcoming activities here"
        avatar={
          <CardTitleIcon icon="icon-[solar--calendar-date-line-duotone]" />
        }
      />
      <CardContent>
        <div className="flex gap-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar views={["day"]} sx={{ m: 0 }} />
          </LocalizationProvider>
          <div className="flex flex-col gap-3">
            {activities.map(({ label, icon }) => (
              <Fragment key={label}>
                <button className="hover:bg-primary/5 p-3">
                  <div className="flex gap-3 items-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 p-3 flex justify-center items-center">
                      <span className={`${icon} text-primary text-3xl`} />
                    </div>
                    <h6 className="font-medium text-left leading-tight text-sm">
                      {label}
                    </h6>
                  </div>
                </button>
                <Divider />
              </Fragment>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
