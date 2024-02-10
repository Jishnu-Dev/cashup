import { Facebook, Linkedin, Target, Twitter, Youtube } from "lucide-react";

import Link from "next/link";
import { createSlug } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-100">
      <section className="container grid grid-flow-row gap-12">
        <TitleSeperator />
        <FooterMenu />
        <SocialLinks />
        <CopyRight />
      </section>
    </footer>
  );
}

const TitleSeperator = () => (
  <div className="flex gap-2 items-center">
    <h6 className="text-primary">INFORPERFORMANCE</h6>
    <hr className="w-full border-black/20" />
  </div>
);

const FooterMenu = () => {
  const footerLinks = [
    {
      title: "Products & Solution",
      links: [
        "Experience Platform",
        "Communications APIs",
        "Cloud Office",
        "Spaces",
        "Call Center Elite",
        "Innovation Without Disruption",
      ],
    },
    {
      title: "Partners",
      links: [
        "Partner Locator",
        "Alliances",
        "Partners",
        "Agents",
        "Investors",
      ],
    },
    {
      title: "Company",
      links: [
        "About Info",
        "Info Life",
        "Diversity",
        "Sustainability",
        "Newsroom",
        "Careers",
      ],
    },
    {
      title: "Resources",
      links: [
        "Support",
        "Blog",
        "Customer Stories",
        "Legal",
        "Documentation Center",
        "Events",
      ],
    },
  ];

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {footerLinks.map(({ title, links }) => (
        <li key={title} className="grid grid-flow-row gap-4">
          {links.map((link) => (
            <Link
              key={link}
              href={`/jishnu/${createSlug(link)}`}
              className="text-sm capitalize text-black/60 hover:text-black"
            >
              {link}
            </Link>
          ))}
        </li>
      ))}
    </ul>
  );
};

const SocialLinks = () => {
  const socialLinks = [
    {
      media: "Facebook",
      Icon: Facebook,
      url: "https://nextjs.org/",
    },
    {
      media: "LinkedIn",
      Icon: Linkedin,
      url: "https://nextjs.org/",
    },
    {
      media: "YouTube",
      Icon: Youtube,
      url: "https://nextjs.org/",
    },
    {
      media: "Twitter",
      Icon: Twitter,
      url: "https://nextjs.org/",
    },
  ];
  return (
    <section className="py-4 border-y flex flex-col md:flex-row max-md:gap-4 justify-between">
      <h6>Connect with us</h6>
      <ul className="flex gap-4">
        {socialLinks.map(({ media, Icon, url }) => (
          <li key={media}>
            <Link href={url} target="_blank">
              {
                <Icon
                  size={42}
                  className="border border-black/50 p-3 rounded-full hover:border-white hover:bg-black hover:text-white"
                />
              }
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const CopyRight = () => {
  const currentYear = new Date().getFullYear();
  return (
    <p className="text-sm text-black/30">{`© ${currentYear} All rights reserved.`}</p>
  );
};
