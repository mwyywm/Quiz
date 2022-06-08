import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import clsx from "clsx";

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
  const [answersObj, setAnswersObj] = useState<AnswerState>({} as AnswerState);
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    question: QuestionType
  ) => {
    setAnswersObj({
      ...answersObj,
      questions: {
        ...answersObj.questions,
        [question.id]: e.target.value,
      },
    });
    console.log("answersObj", answersObj);
  };
  useEffect(() => {
    setAnswersObj({
      title: quiz.title,
      slug: quiz.slug,
      quizID: quiz.id,
      questions: {},
    });
  }, []);
  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-4 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mt-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          {quiz.description}
        </p>
        <div>
          <ul>
            {quiz.questions.map((question: QuestionType) => (
              <li key={question.id}>
                <p className="text-xl font-bold antialiased">
                  {question.question}
                </p>
                <select
                  className="text-black"
                  onChange={(e) => handleChange(e, question)}
                >
                  {question.answers.map((answer: string) => (
                    <option className="text-black" key={answer}>
                      {answer}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            console.log(answersObj);
          }}
        >
          send
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
