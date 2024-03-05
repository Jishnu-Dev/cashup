import Grow from "@mui/material/Grow";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import TwoColumnLayout from "@/components/ui/TwoColumnLayout";

export default function Page() {
  return (
    <TwoColumnLayout illustration="authentication-two-color.svg">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Logo />
        <LoginForm />
      </div>
    </TwoColumnLayout>
  );
}

export const Logo = () => (
  <Grow in>
    <Image
      priority
      width={200}
      height={200}
      // style={{ width: "auto", height: "auto" }}
      alt="Cashup logo"
      src="/images/cashup-logo-colored.png"
    />
  </Grow>
);
