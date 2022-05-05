import React from "react";

const Header = () => {
  return (
    <nav className="mx-auto flex h-28 w-full items-center">
      <div className="mx-auto flex w-[1200px] max-w-full justify-between px-2">
        <h1 className="flex items-center text-2xl font-semibold">Quiz</h1>
        <button className="h-14 w-36 rounded-sm bg-[#3A3949] py-2 px-1 transition-colors hover:bg-gray-700 xs:p-3 xs:px-5">
          Create quiz
        </button>
      </div>
    </nav>
  );
};

export default Header;
