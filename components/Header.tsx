import Link from "next/link";
import clsx from "clsx";

const Header = () => {
  return (
    <header className="mx-auto flex h-28 w-full items-center">
      <nav className="mx-auto flex w-[1200px] max-w-full justify-between px-2">
        <Link href="/">
          <a className="flex items-center text-2xl font-semibold">Quiz</a>
        </Link>
        <Link href="/createquiz">
          <a
            className={clsx(
              "flex h-14 w-36 items-center justify-center rounded-sm bg-[#3A3949] py-2 px-1 text-center transition-colors duration-200 ease-in-out",
              "hover:bg-[#424153] xs:p-3 xs:px-5"
            )}
          >
            Create quiz
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
