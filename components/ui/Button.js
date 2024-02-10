import classNames from "classnames";

export default function Button({
  children,
  kind = "primary",
  className,
  ...props
}) {
  const kinds = {
    primary:
      "w-max h-max rounded-full bg-primary text-white hover:bg-primary/90 px-4 py-2",
    secondary:
      "w-max h-max rounded-full bg-transparent text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2",
  };

  return (
    <button className={classNames(kinds[kind], className)} {...props}>
      {children}
    </button>
  );
}
