import CashupLogo from "@/components/ui/CashupLogo";
import LoginForm from "@/components/forms/LoginForm";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";

export default async function Page({ params: { locale } }) {
  return (
    <TwoColumnLayout illustration="illust-business-card.svg">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <CashupLogo />
        <LoginForm />
      </div>
    </TwoColumnLayout>
  );
}
