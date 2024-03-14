import Authenticator from "@/lib/authenticator";

export const metadata = {
  title: "Onboard",
  description: "Welcome to Cashup admin dashboard",
};

export default function Layout({ children }) {
  return <Authenticator>{children}</Authenticator>;
}
