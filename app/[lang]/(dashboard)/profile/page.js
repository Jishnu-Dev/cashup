import { Fragment } from "react";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default async function Page() {
  return (
    <Fragment>
      <ProfileHero />
      <ProfileTabs />
    </Fragment>
  );
}
