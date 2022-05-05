import clsx from "clsx";

export interface Props {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}
export default function Button({ variant = "primary", ...props }: Props) {
  return (
    <button
      className={clsx(
        "h-14 min-w-[160px] rounded-sm p-4 px-6 font-medium transition-colors",
        {
          "border border-amber-500 bg-amber-500 text-black hover:bg-[#ffad21]":
            variant === "primary",
          "border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black focus:bg-amber-500 focus:text-black":
            variant === "secondary",
        }
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
