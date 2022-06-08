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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // the total amount of questions should be quiz.questions.length - 1.

  const handleNextQuestion = () => {
    // if current question is answered && current question is not the last question
    if (
      Object.entries(answersObj.questions).length === currentQuestion + 1 &&
      currentQuestion < quiz.questions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === quiz.questions.length - 1) {
      // if we are on the last question
      console.log("Quiz is over we should submit here!");
      console.log("answersObj: ", answersObj);
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
            {quiz.questions[currentQuestion]?.question}
          </h2>
          <div>
            {quiz.questions[currentQuestion]?.answers.map((answer) => (
              <button
                key={answer}
                className="mx-4 bg-gray-600 p-2"
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
