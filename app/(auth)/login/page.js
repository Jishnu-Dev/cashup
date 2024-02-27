import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export default function Page() {
  return (
    <section className="h-full w-full bg-[url('/images/bg-layered-waves.svg')] bg-cover bg-no-repeat">
      <div className="container h-full flex flex-col justify-center items-center gap-12">
        <Logo />
        <LoginForm />
        <BlankLayoutFooter />
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

const BlankLayoutFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full fixed bottom-5 text-xs text-white/80 flex gap-4 justify-center">
      <p>{`All rights reserved. ${currentYear} Cashup.`}</p>
      <Link className="hover:text-white hover:underline" href="/privacy-policy">
        Privacy Policy
      </Link>
    </footer>
  );
};
