import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="w-full h-20 mx-auto flex items-center">
      <div className="mx-auto flex justify-between max-w-full w-[1200px] px-2">
        <h1 className="font-semibold text-2xl flex items-center">Quiz</h1>
        <button className="bg-[#3A3949] rounded-sm xs:p-3 xs:px-5 py-2 px-1 transition-colors hover:bg-gray-700">
          Create quiz
        </button>
      </div>
    </nav>
  );
};

export default Header;
