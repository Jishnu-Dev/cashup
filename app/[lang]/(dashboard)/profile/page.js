import ProfileContext from "@/components/profile/ProfileContext";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileTabContent from "@/components/profile/ProfileTabContent";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default async function Page() {
  return (
    <ProfileContext>
      <div className="w-full flex flex-col gap-8">
        <ProfileHero />
        <ProfileTabs />
        <ProfileTabContent />
      </div>
    </ProfileContext>
  );
}
