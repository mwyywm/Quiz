import React, { useRef } from "react";
import Popover from "./Popover";
let x = {
  id: 138,
  title: "asfasdfasdfasdf",
  slug: "asfasdfasdfasdf",
  description: "asdfsadfasdfsadf",
};
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="21"
      height="24"
      fill="none"
      viewBox="0 0 21 24"
    >
      <path fill="url(#pattern0)" d="M0 0H20.364V24H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00343 0 0 .0029 -.09 0)"
            xlinkHref="#image0_224_131"
          ></use>
        </pattern>
        <image
          id="image0_224_131"
          width="344"
          height="344"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}

const QuizCreated = () => {
  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/quiz/${str}`);
  };
  const copyRef = React.useRef(null);
  return (
    <div className="m-auto w-[600px] max-w-full text-black">
      <Popover element={copyRef}>
        <p>Copy to clipboard</p>
      </Popover>
      <h3 className="text-center text-2xl font-bold text-white">
        {x.title} has been created
      </h3>
      <div
        className="m-auto my-2 flex w-80 max-w-full cursor-pointer items-center justify-between rounded-sm bg-white p-1"
        onClick={() => copyToClipboard(x.slug)}
        ref={copyRef}
      >
        <input
          value={`${window.location.origin}/quiz/${x.slug}`}
          readOnly
          className="h-8 w-full cursor-pointer pr-4 focus:outline-none"
        />
        <Icon />
      </div>
    </div>
  );
};

export default QuizCreated;
