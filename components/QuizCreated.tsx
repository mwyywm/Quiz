import React, { useRef, useState } from "react";
import Tooltip from "./Tooltip";
import CheckIcon from "./SVG/CheckIcon";
import CopyIcon from "./SVG/CopyIcon";
import FadeInFadeOut from "./Animation/FadeInFadeOut";
import LinkQuiz from "./LinkQuiz";

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
        <LinkQuiz
          slug={slug}
          isOpen={copiedObj.quizLink}
          setCopiedObj={setCopiedObj}
          linkType="quizLink"
        />
      </label>
      <label className="m-auto flex w-80 max-w-full flex-col text-lg text-white">
        Quiz leaderboard:
        <LinkQuiz
          slug={`${slug}/results`}
          isOpen={copiedObj.quizLink}
          setCopiedObj={setCopiedObj}
          linkType="quizResult"
        />
      </label>
    </div>
  );
};

export default QuizCreated;
