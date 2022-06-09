import Layout from "../../components/Layout";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import SubmittingQuiz from "../../components/SubmittingQuiz";
import clsx from "clsx";

export interface QuizType {
  id: number;
  title: string;
  slug: string;
  description: string;
  questions: QuestionType[];
}
export interface QuestionType {
  id: number;
  question: string;
  answers: string[];
  correctAnswer?: string;
}
export interface AnswersObjState {
  title: string;
  slug: string;
  quizID: number;
  questions: {
    [key: number]: string;
  };
}
interface Props {
  quiz: QuizType;
}

const Quiz = ({ quiz }: Props) => {
  const [answersObj, setAnswersObj] = useState<AnswersObjState>({
    title: quiz.title,
    slug: quiz.slug,
    quizID: quiz.id,
    questions: {},
  } as AnswersObjState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitComponent, setShowSubmitComponent] = useState(false);

  const handleNextQuestion = () => {
    // if current question is answered && current question is not the last question
    if (
      Object.entries(answersObj.questions).length === currentQuestion + 1 &&
      currentQuestion < quiz.questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === quiz.questions.length - 1) {
      // if we are on the last question we show the submit component
      setShowSubmitComponent(true);
    }
  };
  const handleAnswer = (answer: string, questionID: number) => {
    setAnswersObj({
      ...answersObj,
      questions: {
        ...answersObj.questions,
        [questionID]: answer,
      },
    });
  };
  if (showSubmitComponent) {
    return <SubmittingQuiz quiz={quiz} answersObj={answersObj} />;
  }
  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-4 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mt-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          {quiz.description}
        </p>
        <div className="mt-5 flex flex-col justify-center bg-gray-500">
          <h2 className="text-left">
            {quiz.questions[currentQuestion]?.question}
          </h2>
          <div
            className={clsx(
              "grid max-w-full gap-2 bg-red-400",
              quiz.questions[currentQuestion]?.answers.length === 4
                ? "grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {quiz.questions[currentQuestion]?.answers.map((answer) => (
              <button
                key={answer}
                className="min-h-[60px] w-full max-w-full break-all rounded-sm bg-white py-2 text-black"
                onClick={() =>
                  handleAnswer(
                    answer,
                    Number(quiz.questions[currentQuestion]?.id)
                  )
                }
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        <button
          className="rounded-md bg-blue-400 p-2 font-semibold text-black"
          onClick={handleNextQuestion}
        >
          next
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const index = ctx.params && ctx.params.index;
  const prismaQuiz = await prisma.quiz.findUnique({
    where: {
      slug: index && index.toString(),
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answers: true,
          correctAnswer: false,
        },
      },
    },
  });

  return {
    props: {
      quiz: prismaQuiz,
    },
  };
};

export default Quiz;
