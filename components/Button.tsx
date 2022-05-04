import clsx from "clsx";

export interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}
export default function Button({
  children,
  onClick,
  variant = "primary",
}: Props) {
  return (
    <button
      className={clsx(
        [
          variant === "primary" &&
            "bg-amber-500 text-black font-medium p-4 px-6 rounded-sm transition-colors hover:bg-amber-400",
        ],
        [
          variant === "secondary" &&
            "text-amber-400 p-4 px-6 outline outline-1 outline-amber-400 rounded-sm transition-colors hover:bg-amber-400 hover:text-black  focus:bg-amber-400 focus:text-black",
        ]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
