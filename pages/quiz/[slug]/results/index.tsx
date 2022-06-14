import { GetServerSideProps } from "next/types";
import Layout from "../../../../components/Layout";

interface Props {
  quizResult: QuizResultType;
  user: ResultsType;
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
  // if the user is true we show the result of the latest quiz made by the ?user= and the leaderboard.
  // if the user is falsy we just show the leaderboard.
  console.log("username", user);
  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-4 break-words text-center text-[40px] font-bold antialiased">
          {quizResult.title}
        </h1>
        {user && (
          <div>
            <h2 className="mb-4 break-words text-center text-3xl font-normal antialiased">
              Your score
            </h2>
            <div className="flex max-w-full items-center justify-between bg-white p-2 py-4 text-black">
              <p className="w-[75%] break-words text-xl">{user.username}</p>
              <p className="max-w-[25%] break-words text-xl">
                {user.score * 100} points
              </p>
            </div>
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
      </div>
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
