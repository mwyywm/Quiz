import Layout from "../../components/Layout";
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
  questions: {
    id: number;
    question: string;
    answers: string[];
    correctAnswer?: string;
  };
}

const Quiz = ({ quiz }: Props) => {
  return (
    <Layout>
      {console.log(quiz)}
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-4 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mt-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          {quiz.description}
        </p>
        <div>{/* quiz taking component goes here */}</div>
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
