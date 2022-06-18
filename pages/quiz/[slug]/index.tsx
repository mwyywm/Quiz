import Layout from "../../../components/Layout";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../../lib/prisma";
import SubmittingQuiz from "../../../components/SubmittingQuiz";
import QuizProgress from "../../../components/QuizProgress";
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
  quizId: number;
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
    quizId: quiz.id,
    questions: {},
  } as AnswersObjState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitComponent, setShowSubmitComponent] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNextQuestion = () => {
    // if current question is answered && current question is not the last question
    setSelectedAnswer("");
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
    setSelectedAnswer(answer);
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
        <h1 className="mb-4 break-words text-center text-[40px] font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mt-5 w-[550px] max-w-full break-words text-center text-xl font-normal text-gray-300 antialiased">
          {quiz.description}
        </p>
        <QuizProgress
          current={currentQuestion + 1}
          total={quiz.questions.length}
        />
        <div className="mt-5 flex flex-col justify-center">
          <div className="mb-4 min-h-[100px]">
            <h2 className="text-all break-words text-2xl font-normal antialiased">
              {quiz.questions[currentQuestion]?.question}
            </h2>
          </div>
          <div
            className={clsx(
              "mb-4 grid max-w-full grid-cols-1 gap-1.5",
              quiz.questions[currentQuestion]?.answers.length === 4
                ? "sm:grid-cols-2"
                : "sm:grid-cols-1"
            )}
          >
            {quiz.questions[currentQuestion]?.answers.map((answer) => (
              <button
                key={answer}
                className={clsx(
                  "min-h-[60px] w-full max-w-full break-all rounded-sm bg-white p-2 text-lg text-black",
                  "transition-colors duration-200 ease-in-out",
                  {
                    "bg-[#ffad21]": selectedAnswer === answer,
                    "hover:bg-gray-300": selectedAnswer !== answer,
                  }
                )}
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
        <div className="flex justify-end">
          <button
            className={clsx(
              "h-16 w-32 rounded-md bg-white p-2 text-lg font-normal text-black transition-colors duration-200 ease-in-out",
              "hover:bg-gray-300 disabled:bg-gray-300"
            )}
            onClick={handleNextQuestion}
            disabled={selectedAnswer === ""}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params && ctx.params.slug;
  const prismaQuiz = await prisma.quiz.findUnique({
    where: {
      slug: slug && slug.toString(),
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
