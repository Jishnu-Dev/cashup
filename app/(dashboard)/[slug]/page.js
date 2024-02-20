export default function Page({ params }) {
  const { slug } = params;
  return <div>{slug}</div>;
}
