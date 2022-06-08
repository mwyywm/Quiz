import Layout from "../../components/Layout";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

export interface Props {
  quiz: QuizType;
}
interface QuizType {
  id: number;
  title: string;
  slug: string;
  description: string;
  questions: QuestionType[];
}
interface QuestionType {
  id: number;
  question: string;
  answers: string[];
  correctAnswer?: string;
}
interface AnswerState {
  title: string;
  slug: string;
  quizID: number;
  questions: {
    [key: number]: string;
  };
}
const Quiz = ({ quiz }: Props) => {
  const [answersObj, setAnswersObj] = useState<AnswerState>({
    title: quiz.title,
    slug: quiz.slug,
    quizID: quiz.id,
    questions: {},
  } as AnswerState);
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  // the total amount of questions should be quiz.questions.length - 1.
  console.log(quiz.questions[currentQuestionID]);
  const handleNextQuestion = () => {
    if (currentQuestionID < quiz.questions.length - 1) {
      setCurrentQuestionID(currentQuestionID + 1);
    } else {
      // handle submit
    }
  };
  const handleAnswer = (answer: string) => {
    // handle answer
    console.log(answer);
  };
  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-4 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mt-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          {quiz.description}
        </p>
        {/* the current question prev/next component below */}
        <div className="mt-5 flex">
          <h2 className="text-left">
            {quiz.questions[currentQuestionID]?.question}
          </h2>
          <div>
            {quiz.questions[currentQuestionID]?.answers.map((answer) => (
              <button
                className="mx-4 bg-gray-600 p-2"
                onClick={() => handleAnswer(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        {/* the current question prev/next component above */}
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
