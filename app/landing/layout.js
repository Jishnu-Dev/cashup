import Footer from "@/components/layout/Footer";
import { Fragment } from "react";
import Header from "@/components/layout/Header";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
