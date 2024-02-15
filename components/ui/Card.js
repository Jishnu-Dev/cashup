export default function Card({ title, lead, children }) {
  return (
    <div className="bg-white rounded-2xl border shadow-xl shadow-primary/10 p-4 grid grid-flow-row gap-4">
      <div>
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <p className="text-black text-sm">{lead}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
