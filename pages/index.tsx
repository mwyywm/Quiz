import React from "react";
import Head from "next/head";
import prisma from "../lib/prisma";
import QuizButton from "../components/QuizButton";
import LinkAsButton from "../components/LinkAsButton";
import { GetStaticProps } from "next/types";

interface popularQuiz {
  title: string;
  slug: string;
  questionsCount: number;
}
interface Props {
  popularQuizzes: popularQuiz[];
  recommendedQuizzes: popularQuiz[];
}

const Landing = ({ popularQuizzes, recommendedQuizzes }: Props) => {
  return (
    <>
      <section className="mb-24">
        <Head>
          <title>Quiz</title>
          <meta name="description" content="Create your own quiz!" />
        </Head>
        <div className="mx-auto w-[650px] max-w-full">
          <h1 className="break-words text-center text-4xl font-bold antialiased xs:text-5xl">
            Create your own quiz!
          </h1>
          <p className="mx-auto mt-5 w-[550px] max-w-full break-words text-center text-xl font-normal text-gray-300 antialiased">
            Complete a quiz from the list below or create your own! See how you
            score compared to everyone else.
          </p>
        </div>
        <div className="mx-auto mt-16 flex flex-wrap justify-center">
          <div className="m-2 w-full xs:w-auto">
            <LinkAsButton href="/createquiz">Create quiz</LinkAsButton>
          </div>
          <div className="m-2 w-full xs:w-auto">
            <LinkAsButton href="/randomquiz" variant="secondary">
              Random quiz
            </LinkAsButton>
          </div>
        </div>
      </section>
      <section className="min-h-[200px]">
        <h2 className="max-w-full break-words text-center text-3xl font-bold xs:text-4xl">
          Most popular
        </h2>
        <div className="mt-12">
          {popularQuizzes.map((quiz) => (
            <div className="m-auto my-3 w-[650px] max-w-full" key={quiz.title}>
              <QuizButton
                title={quiz.title}
                questionsCount={quiz.questionsCount}
                slug={quiz.slug}
              />
            </div>
          ))}
        </div>
        <h3 className="mt-12 break-all text-center text-3xl font-bold xs:text-4xl">
          Recommended
        </h3>
        <div className="mt-12 mb-12">
          {/* <div className="m-auto my-5 grid w-[650px] max-w-full gap-3">
            <QuizButton title="cool" questionsCount={12} slug="cool" />
            <QuizButton title="fouro" questionsCount={20} slug="fouro" />
            <QuizButton title="tenten" questionsCount={12} slug="tenten" />
          </div> */}
          {recommendedQuizzes.map((quiz) => (
            <div className="m-auto my-3 w-[650px] max-w-full" key={quiz.title}>
              <QuizButton
                title={quiz.title}
                questionsCount={quiz.questionsCount}
                slug={quiz.slug}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // 3 most popular quizzes
  // we need a way to get the most popular quizzes
  // get the number of results from the database
  const popularQuizzes = await prisma.quiz.findMany({
    include: {
      questions: {
        select: {
          id: true,
        },
      },
      results: {
        select: {
          id: true,
        },
      },
    },
  });
  const sortedPopularQuizzes = popularQuizzes
    .sort((a, b) => {
      return b.results.length - a.results.length;
    }) // sort by most results
    .slice(0, 3) // get top 3
    .map((quiz) => {
      const returnObj = {
        title: quiz.title,
        slug: quiz.slug,
        questionsCount: quiz.questions.length,
      };
      return returnObj;
    });

  const recommended = [
    { title: "cool", slug: "cool", questionsCount: 12 },
    { title: "fouro", slug: "fouro", questionsCount: 20 },
    { title: "tenten", slug: "tenten", questionsCount: 12 },
  ];
  return {
    props: {
      popularQuizzes: sortedPopularQuizzes, // 3 quizzes with the most results
      recommendedQuizzes: recommended, // 3 recommended quizzes
    },
    revalidate: 300,
  };
};
export default Landing;
