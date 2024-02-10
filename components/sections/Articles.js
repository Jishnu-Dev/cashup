import { ArrowRight, ArrowUpRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { createSlug } from "@/lib/utils";

export default function Articles() {
  const articles = [
    {
      title: `What Can A Business Do To Improve Its Productivity?`,
      figure: "article-1-cover.jpg",
      tag: "Study",
      lead: "Enhancing productivity is a constant pursuit for businesses aiming to stay competitive and achieve their goals efficiently. In today’s dynamic and fast-paced business landscape, optimizing productivity has become a strategic imperative. This entails implementing a combination of strategies, processes.",
    },
    {
      title: `How Can Work From Home Burnout Be Avoided And Managed Effectively?`,
      figure: "article-2-cover.jpg",
      tag: "Info Research",
      lead: "The work landscape has undergone a significant transformation with the rise of work from home jobs. Remote work, including data entry and entry-level positions, has become increasingly popular due to its flexibility and convenience.",
    },
    {
      title: `The Significance Of Customer Service In Healthcare`,
      figure: "article-3-cover.jpg",
      tag: "Training",
      lead: "In the rapidly evolving landscape of healthcare, where technology and patient expectations are constantly changing, the significance of customer service has become more prominent than ever. Alongside medical advancements, patients now seek seamless and personalized experiences.",
    },
  ];

  return (
    <section className="container section-spacing grid grid-flow-row gap-8">
      <h5 className="text-2xl md:text-3xl font-light" data-aos="fade-up">
        Top <span className="text-primary">Articles</span>
      </h5>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {articles.map((article, i) => (
          <BlogCard
            key={i}
            article={article}
            data-aos="fade-up"
            data-aos-delay={i * 150}
          />
        ))}
      </ul>
      <Button kind="secondary" className="mx-auto">
        Explore All Articles
      </Button>
    </section>
  );
}

const BlogCard = ({ article, ...props }) => {
  const { title, figure, lead, tag } = article;
  const slug = createSlug(title);

  return (
    <Link href={`/jishnu/${slug}`} {...props}>
      <article className="grid grid-flow-row gap-4 bg-gray-100 hover:bg-gray-200 group">
        <figure className="h-72 w-full relative overflow-hidden">
          <Image
            fill
            alt={title}
            src={`/images/${figure}`}
            sizes="100vw"
            className="object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
          />
        </figure>
        <div className="grid grid-flow-row gap-20 p-3">
          <div className="grid grid-flow-row gap-4">
            <p className="text-black/50">{tag}</p>
            <p className="text-xl leading-normal line-clamp-3 font-light">
              {lead}
            </p>
          </div>
          <ArrowRight className="text-primary group-hover:translate-x-2 transition-all duration-300 ease-in-out" />
        </div>
      </article>
    </Link>
  );
};
