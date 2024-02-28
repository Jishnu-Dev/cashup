import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";

export default function Page() {
  return (
    <section className="h-full w-full bg-[url('/images/bg-layered-waves.sv')] bg-cover bg-no-repeat">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Logo />
        <LoginForm />
      </div>
    </section>
  );
}

const Logo = () => (
  <Image
    priority
    width={200}
    height={200}
    // style={{ width: "auto", height: "auto" }}
    alt="Cashup logo"
    src="/images/cashup-logo-colored.png"
  />
);
