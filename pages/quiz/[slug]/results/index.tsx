import { GetServerSideProps } from "next/types";
import Layout from "../../../../components/Layout";

interface Props {
  quizResult: QuizResultType;
  user: ResultsType["username"];
}
export interface QuizResultType {
  id: number;
  title: string;
  results: ResultsType[];
}
export interface ResultsType {
  id: number;
  username: string;
  score: number;
  total: number;
}

const QuizResults = ({ quizResult, user }: Props) => {
  console.log("username", user);
  return (
    <Layout>
      <h1>{quizResult.title}</h1>
      {user && (
        <div>
          <h2>{JSON.stringify(user)}</h2>
        </div>
      )}
      <ul>
        {quizResult.results.map((result) => (
          <li key={result.id}>
            {result.username} - {result.score * 100} / {result.total * 100}{" "}
            points
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params && ctx.params.slug;
  const user = ctx.query.user;
  const usernameResult = await prisma?.quiz.findUnique({
    where: {
      slug: slug as string,
    },
    select: {
      id: true,
      title: true,
      results: {
        where: {
          username: user as string,
        },
        select: {
          username: true,
          id: true,
          score: true,
          total: true,
        },
      },
    },
  });
  const quizResult = await prisma?.quiz.findUnique({
    where: {
      slug: slug as string,
    },
    select: {
      id: true,
      title: true,
      results: {
        select: {
          username: true,
          id: true,
          score: true,
          total: true,
        },
      },
    },
  });
  return {
    props: {
      quizResult: quizResult,
      user:
        usernameResult?.results[usernameResult?.results.length - 1] && user
          ? usernameResult?.results[usernameResult?.results.length - 1]
          : null, // The latest result for the ?user=
    },
  };
};
export default QuizResults;
