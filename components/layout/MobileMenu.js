"use client";

import { Expand, MenuIcon, XIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import Link from "next/link";
import ShowWhen from "@/components/ui/ShowWhen";
import { menuLinks } from "@/components/layout/Header";

export default function MobileMenu({ className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((isOpen) => !isOpen);

  const isClient = typeof window !== "undefined";
  useEffect(() => {
    if (!isClient) return;

    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <Fragment>
      <menu className="flex md:hidden container py-5 w-full justify-between items-center">
        <Branding />
        <button onClick={toggleMenu} className="text-primary">
          <MenuIcon size={32} />
        </button>
      </menu>
      <ShowWhen when={isMenuOpen}>
        <div className="container py-16 absolute top-0 left-0 z-10 h-screen w-screen bg-white">
          <div className="flex justify-end items-center">
            <button onClick={toggleMenu} className="text-primary">
              <XIcon size={32} />
            </button>
          </div>
          <div className="h-full flex flex-col justify-between">
            <ul className="grid grid-flow-row gap-4 mt-12">
              {menuLinks.map(({ label, link }) => (
                <li key={link}>
                  <Link
                    href={`/jishnu/${link}`}
                    onClick={toggleMenu}
                    className="flex flex-col hover:bg-primary hover:text-white group"
                  >
                    <p className="py-2 group-hover:translate-x-2 transition-transform duration-300 ease-in-out">
                      {label}
                    </p>
                    <hr className="border-primary/50" />
                  </Link>
                </li>
              ))}
            </ul>
            <Button>Get in Touch</Button>
          </div>
        </div>
      </ShowWhen>
    </Fragment>
  );
}

export const Branding = () => (
  <Link href="/">
    <h1 className="text-xl font-semibold text-primary uppercase leading-5 flex gap-1 items-center">
      <Expand size={48} />
      INFO
      <br />
      PERFORMANCE
    </h1>
  </Link>
);
