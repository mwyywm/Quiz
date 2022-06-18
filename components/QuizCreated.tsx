import React, { useRef, useState } from "react";
import Tooltip from "./Tooltip";
import CheckIcon from "./SVG/CheckIcon";
import CopyIcon from "./SVG/CopyIcon";
interface QuizType {
  id: number;
  title: string;
  slug: string;
  description: string;
}
export interface CopiedObjTypes {
  quizLink: boolean;
  quizResult: boolean;
}
interface Props {
  quiz: QuizType;
}
const QuizCreated = ({ quiz }: Props) => {
  const { title, slug } = quiz;
  const [copiedObj, setCopiedObj] = useState<CopiedObjTypes>({
    quizLink: false,
    quizResult: false,
  });
  const firstCopyRef = useRef(null);
  const secondCopyRef = useRef(null);

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/quiz/${str}`);
  };

  return (
    <div className="m-auto w-[600px] max-w-full text-black">
      <h1 className="mb-6 text-center text-3xl font-bold text-white antialiased">
        {title} has been created
      </h1>
      <label className="m-auto flex w-80 max-w-full flex-col text-lg text-white">
        Quiz link:
        <Tooltip
          ref={firstCopyRef}
          text="Copy to clipboard"
          setCopiedObj={setCopiedObj}
        >
          <div
            className="m-auto my-2 flex w-80 max-w-full cursor-pointer items-center justify-between rounded-sm bg-white p-1"
            onClick={() => copyToClipboard(slug)}
            ref={firstCopyRef}
            data-name="quizLink"
          >
            <input
              value={`${window.location.origin}/quiz/${slug}`}
              readOnly
              className="h-8 w-full cursor-pointer pr-4 text-black focus:outline-none"
            />
            {copiedObj.quizLink ? <CheckIcon /> : <CopyIcon />}
          </div>
        </Tooltip>
      </label>
      <label className="m-auto flex w-80 max-w-full flex-col text-lg text-white">
        Quiz leaderboard:
        <Tooltip
          ref={secondCopyRef}
          text="Copy to clipboard"
          setCopiedObj={setCopiedObj}
        >
          <div
            className="m-auto my-2 flex w-80 max-w-full cursor-pointer items-center justify-between rounded-sm bg-white p-1"
            onClick={() => copyToClipboard(`${slug}/results`)}
            ref={secondCopyRef}
            data-name="quizResult"
          >
            <input
              value={`${window.location.origin}/quiz/${slug}/results`}
              readOnly
              className="h-8 w-full max-w-full cursor-pointer pr-4 text-black focus:outline-none"
            />
            {copiedObj.quizResult ? <CheckIcon /> : <CopyIcon />}
          </div>
        </Tooltip>
      </label>
    </div>
  );
};

export default QuizCreated;
