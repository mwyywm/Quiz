import React, { useState } from "react";
import LinkQuiz from "./LinkQuiz";

interface QuizType {
  id: number;
  title: string;
  slug: string;
  description: string;
}
export interface CopiedObjTypes {
  quiz: boolean;
  results: boolean;
}
interface Props {
  quiz: QuizType;
}
const QuizCreated = ({ quiz }: Props) => {
  const { title, slug } = quiz;
  const [copiedObj, setCopiedObj] = useState<CopiedObjTypes>({
    quiz: false,
    results: false,
  });
  return (
    <div className="m-auto w-[600px] max-w-full text-black">
      <h1 className="mb-6 max-w-full break-words text-center text-3xl font-bold text-white antialiased">
        {title} has been created
      </h1>
      <label className="m-auto flex w-80 max-w-full flex-col text-lg text-white">
        Quiz link:
        <LinkQuiz
          slug={slug}
          isOpen={copiedObj.quiz}
          setCopiedObj={setCopiedObj}
          linkType="quiz"
        />
      </label>
      <label className="m-auto flex w-80 max-w-full flex-col text-lg text-white">
        Quiz leaderboard:
        <LinkQuiz
          slug={`${slug}/results`}
          isOpen={copiedObj.results}
          setCopiedObj={setCopiedObj}
          linkType="results"
        />
      </label>
    </div>
  );
};

export default QuizCreated;
