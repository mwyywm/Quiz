import clsx from "clsx";
import Link from "next/link";

export interface Props {
  href: string;
  children: string; // no JSX allowed inside of children
  variant?: "primary" | "secondary";
}

const LinkAsButton = ({ children, variant = "primary", ...props }: Props) => {
  return (
    <Link href={props.href}>
      <a
        className={clsx(
          "flex h-14 w-full items-center justify-center rounded-sm py-4 px-6 text-center font-medium transition-colors",
          {
            "border border-amber-500 bg-amber-500 text-black hover:bg-[#ffad21]":
              variant === "primary",
            "border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black focus:bg-amber-500 focus:text-black":
              variant === "secondary",
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkAsButton;
