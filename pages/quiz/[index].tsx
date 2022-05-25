import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

export interface Props {
  params: string;
}

const Quiz = ({ quiz }: Props) => {
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
          <ul className="list-inside list-disc">
            {quiz.questions.map((question) => (
              <li key={question.id}>
                <h2 className="text-xl font-bold antialiased">
                  {question.question}
                </h2>
                <ul className="list-inside list-disc">
                  {question.answers.map((answer) => (
                    <li key={answer.id}>{answer.answer}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {console.log(quiz)}
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
      questions: true,
    },
  });

  return {
    props: {
      quiz: prismaQuiz,
    },
  };
};

export default Quiz;
