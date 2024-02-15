import ShowWhen from "@/lib/ShowWhen";
import cn from "classnames";

export default function Card({ title, lead, children, blank = false }) {
  return (
    <div
      className={cn({
        "bg-white rounded-2xl border shadow-xl shadow-primary/10 grid grid-flow-row gap-4": true,
        "p-4": !blank,
      })}
    >
      <ShowWhen when={title}>
        <div>
          <h3 className="text-xl font-medium text-black">{title}</h3>
          <p className="text-black text-sm">{lead}</p>
        </div>
      </ShowWhen>
      <div>{children}</div>
    </div>
  );
}
