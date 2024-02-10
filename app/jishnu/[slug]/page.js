import { tagline } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: capitalize(slug),
    description: tagline,
  };
}

export default function Page({ params }) {
  const { slug } = params;
  return (
    <section className="container section-spacing flex flex-col justify-center items-center gap-6">
      <h2 className="text-primary text-2xl">
        Current Slug: <kbd className="font-mono px-2 bg-primary/20">{slug}</kbd>
      </h2>
      <p className="text-sm text-primary/80">
        This is a dynamic page, for the skill assessment purpose :- Jishnu Raj
      </p>
      <Link
        href="/"
        className="border border-primary bg-transparent hover:bg-primary hover:text-white w-max text-primary px-4 py-2"
      >
        Go Home
      </Link>
    </section>
  );
}
