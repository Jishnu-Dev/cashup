import ShowWhen from "@/lib/ShowWhen";
import cn from "classnames";

export default function Card({ title, lead, children, blank = false }) {
  return (
    <div
      className={cn({
        "bg-white rounded-2xl border shadow-xl shadow-primary/10 grid grid-flow-row gap-6": true,
        "p-4": !blank,
      })}
    >
      <ShowWhen when={title}>
        <span>
          <h3 className="text-xl font-medium text-black">{title}</h3>
          <p className="text-black/80 text-sm">{lead}</p>
        </span>
      </ShowWhen>
      <span className="overflow-x-scroll">{children}</span>
    </div>
  );
}
