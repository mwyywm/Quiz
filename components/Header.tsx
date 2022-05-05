import React from "react";
import Link from "next/link";
import clsx from "clsx";

const Header = () => {
  return (
    <nav className="mx-auto flex h-28 w-full items-center">
      <div className="mx-auto flex w-[1200px] max-w-full justify-between px-2">
        <Link href="/">
          <a className="flex items-center text-2xl font-semibold">Quiz</a>
        </Link>
        <Link href="/createquiz">
          <a
            className={clsx(
              "flex h-14 w-36 items-center justify-center rounded-sm bg-[#3A3949] py-2 px-1 transition-colors",
              "hover:bg-gray-700 xs:p-3 xs:px-5"
            )}
          >
            Create quiz
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
