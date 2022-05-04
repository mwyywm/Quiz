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
        "min-w-[140px] rounded-sm p-4 px-6 font-medium transition-colors",
        [
          variant === "primary" &&
            "border border-amber-500 bg-amber-500 text-black hover:bg-[#ffad21]",
        ],
        [
          variant === "secondary" &&
            "border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black  focus:bg-amber-500 focus:text-black",
        ]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
// TODO: The colors here should eventually be changed. At least the hover bg-color.
