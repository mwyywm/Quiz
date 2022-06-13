import React, { useRef } from "react";
import Layout from "./Layout";
import { QuizType, AnswersObjState } from "../pages/quiz/[index]";

interface Props {
  quiz: QuizType;
  answersObj: AnswersObjState;
}

const SubmittingQuiz = ({ quiz, answersObj }: Props) => {
  const usernameRef = useRef<HTMLInputElement>(null);

  const submitQuizAnswers = async () => {
    // TODO: this is what we will eventually send to the server
    // { ...answersObj, username: usernameRef.current?.value }
    console.log({ ...answersObj, username: usernameRef.current?.value });
  };

  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-4 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mt-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          To see your final score please write your username and then submit.
          Your username and score can be viewed by anyone.
        </p>
        <div className="mt-5 flex">
          <input
            ref={usernameRef}
            className="text-black"
            placeholder="username"
            type="text"
            required
          />
        </div>
        <button
          className="rounded-md bg-blue-400 p-2 font-semibold text-black"
          onClick={submitQuizAnswers}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default SubmittingQuiz;
