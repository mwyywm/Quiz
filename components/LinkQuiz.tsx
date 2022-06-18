import React, { useRef } from "react";
import FadeInFadeOut from "./Animation/FadeInFadeOut";
import { CopiedObjTypes } from "./QuizCreated";
import clsx from "clsx";
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
        role="button"
        className={clsx(
          "m-auto my-2 flex w-80 max-w-full cursor-pointer items-center justify-between rounded border border-[#5c6070] bg-[#40434f] p-1"
        )}
        onClick={() => copyToClipboard(slug)}
        ref={copyRef}
        data-name={linkType}
      >
        <p className="h-8 w-full cursor-pointer truncate bg-[#40434f] pr-1 text-white focus:outline-none">{`${window.location.origin}/quiz/${slug}`}</p>
        <div className="flex h-8 w-7 items-center justify-center">
          <FadeInFadeOut
            isOpen={isOpen}
            falseChild={<CopyIcon fill="white" />}
            trueChild={<CheckIcon fill="white" />}
          />
        </div>
      </div>
    </Tooltip>
  );
};
export default LinkQuiz;
