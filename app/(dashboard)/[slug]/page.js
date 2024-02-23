export default function Page({ params }) {
  const { slug } = params;
  return (
    <section className="h-full w-full flex justify-center items-center">
      <h1 className="text-3xl font-medium capitalize">{`${slug} (Coming Soon)`}</h1>
    </section>
  );
}
