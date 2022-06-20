import Head from "next/head";
import { GetServerSideProps } from "next/types";
import NotFound from "../../../../components/NotFound";
import QuizResultCard from "../../../../components/QuizResultCard";
import prisma from "../../../../lib/prisma";

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
  createdAt: Date;
  score: number;
  total: number;
}

const QuizResults = ({ quizResult, user }: Props) => {
  // if the user is true we show the result of the latest quiz made by the ?user= and the leaderboard.
  // if the user is falsy we just show the leaderboard.

  if (!quizResult) {
    // this only happens if you try to access the results for a quiz that doesn't exist.
    return <NotFound />;
  }
  return (
    <>
      <Head>
        <title>Quiz - {quizResult.title} results</title>
        <meta
          name="description"
          content={`Results page for ${quizResult.title}`}
        />
      </Head>
      <div className="mx-auto mb-14 w-[650px] max-w-full">
        <h1 className="mb-4 break-words text-center text-[40px] font-bold antialiased">
          {quizResult.title}
        </h1>
        {user && (
          <div className="mb-10">
            <h2 className="mb-4 break-words text-center text-2xl font-normal antialiased">
              Your score
            </h2>
            <QuizResultCard result={user} />
          </div>
        )}
        {quizResult.results.length === 0 && (
          <div className="mb-10">
            <h2 className="mb-4 break-words text-center text-2xl font-normal antialiased">
              No results have been submitted yet. 😢
            </h2>
          </div>
        )}
        {quizResult.results.length > 0 && (
          <div>
            <h2 className="mb-4 break-words text-center text-2xl font-normal antialiased">
              Leaderboard
            </h2>
            <div className="flex flex-col gap-2">
              {quizResult.results.map((result) => (
                <QuizResultCard
                  result={result}
                  key={result.username}
                  showDate
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
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
        orderBy: {
          score: "desc",
        },
        select: {
          username: true,
          createdAt: true,
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
          : null, // if there is a user we show latest result of the user ELSE we show null
    },
  };
};
export default QuizResults;
