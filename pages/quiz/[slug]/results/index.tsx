import { GetServerSideProps } from "next/types";
import Layout from "../../../../components/Layout";
import QuizResultCard from "../../../../components/QuizResultCard";

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
          <div className="mb-10">
            <h2 className="mb-4 break-words text-center text-3xl font-normal antialiased">
              Your score
            </h2>
            <QuizResultCard name={user.username} score={user.score} />
          </div>
        )}
        {quizResult && (
          <div>
            <h2 className="mb-4 break-words text-center text-3xl font-normal antialiased">
              Leaderboard
            </h2>
            <div className="flex flex-col gap-2">
              {quizResult.results.map((result) => (
                <QuizResultCard
                  name={result.username}
                  score={result.score}
                  key={result.username}
                />
              ))}
            </div>
          </div>
        )}
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
