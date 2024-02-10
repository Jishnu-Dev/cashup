import Link from "next/link";

export default function NotificationRibbon() {
  const socialLinks = [
    {
      label: "Help Center",
      url: "https://nextjs.org/",
    },
    {
      label: "Privacy",
      url: "https://nextjs.org/",
    },
    {
      label: "Connect",
      url: "tel: 9710123456",
    },
  ];
  return (
    <section className="bg-primary text-white">
      <div className="container py-2 flex justify-between items-center">
        <p className="text-sm w-max flex gap-2 flex-shrink-0">
          Powered by
          <Link
            href="https://www.greennestgroup.com/"
            target="_blank"
            className="underline"
          >
            Green Nest Group of Companies
          </Link>
        </p>
        <ul className="hidden md:flex gap-4 flex-shrink-0">
          {socialLinks.map(({ label, url }, i) => (
            <li key={i}>
              <Link
                href={url}
                className="text-sm hover:underline"
                target="_blank"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
