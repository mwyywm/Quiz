import React, { useRef } from "react";
import FadeInFadeOut from "./Animation/FadeInFadeOut";
import { CopiedObjTypes } from "./QuizCreated";
import CheckIcon from "./SVG/CheckIcon";
import CopyIcon from "./SVG/CopyIcon";
import Tooltip from "./Tooltip";

interface Props {
  slug: string;
  isOpen: boolean;
  setCopiedObj: React.Dispatch<React.SetStateAction<CopiedObjTypes>>;
  linkType: "quiz" | "results";
}
const LinkQuiz = ({ slug, isOpen, setCopiedObj, linkType }: Props) => {
  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/quiz/${str}`);
  };

  const copyRef = useRef(null);
  return (
    <Tooltip ref={copyRef} text="Copy to clipboard" setCopiedObj={setCopiedObj}>
      <div
        className="m-auto my-2 flex w-80 max-w-full cursor-pointer items-center justify-between rounded-sm bg-white p-1"
        onClick={() => copyToClipboard(slug)}
        ref={copyRef}
        data-name={linkType}
      >
        <input
          value={`${window.location.origin}/quiz/${slug}`}
          readOnly
          className="h-8 w-full cursor-pointer pr-4 text-black focus:outline-none"
        />
        <div className="flex h-7 w-7 items-center justify-center ">
          <FadeInFadeOut
            isOpen={isOpen}
            falseChild={<CopyIcon />}
            trueChild={<CheckIcon />}
          />
        </div>
      </div>
    </Tooltip>
  );
};
export default LinkQuiz;
