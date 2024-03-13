import ProfileHero from "@/components/profile/ProfileHero";
import ProfileTabContent from "@/components/profile/ProfileTabContent";

export default async function Page() {
  return (
    <div className="w-full flex flex-col gap-8">
      <ProfileHero />
      <ProfileTabContent />
    </div>
  );
}
