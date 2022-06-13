import React, { useRef } from "react";
import Layout from "./Layout";
import { QuizType, AnswersObjState } from "../pages/quiz/[index]";
import clsx from "clsx";

interface Props {
  quiz: QuizType;
  answersObj: AnswersObjState;
}

const SubmittingQuiz = ({ quiz, answersObj }: Props) => {
  const usernameRef = useRef<HTMLInputElement>(null);

  const submitQuizAnswers = async () => {
    // TODO: this is what we will eventually send to the server
    // TODO: After sending the quiz answers to the server, redirect to the quiz results page

    console.log({ ...answersObj, username: usernameRef.current?.value });
  };

  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-9 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mb-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          To see your final score please write your username and then submit.
          Your username and score can be viewed by anyone.
        </p>
        <div className="mb-5 flex">
          <input
            ref={usernameRef}
            className={clsx(
              "m-auto w-full rounded-sm p-2 text-black sm:w-60 sm:rounded-sm",
              "focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-gray-400"
            )}
            placeholder="username"
            type="text"
            required
          />
          {/* Could use react-hook-form to handle errors in the form */}
        </div>
        <div className="flex justify-end">
          <button
            className={clsx(
              "h-16 w-32 rounded-md bg-white p-2 text-lg font-normal text-black transition-colors duration-200 ease-in-out",
              "hover:bg-gray-300 disabled:bg-gray-300"
            )}
            onClick={submitQuizAnswers}
            disabled={!usernameRef.current?.value}
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SubmittingQuiz;
