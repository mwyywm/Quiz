import React from "react";
import Head from "next/head";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
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
}

const Landing = ({ popularQuizzes }: Props) => {
  return (
    <Layout>
      <section className="mb-24">
        <Head>
          <title>Quiz</title>
          <meta name="description" content="Create your own quiz!" />
        </Head>
        <div className="mx-auto w-[650px] max-w-full">
          <h1 className="text-center text-5xl font-bold antialiased">
            Create your own quiz!
          </h1>
          <p className="mx-auto mt-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
            Complete a quiz from the list below or create your own! See how you
            score compared to everyone else.
          </p>
        </div>
        <div className="mx-auto mt-16 flex flex-wrap justify-center">
          <div className="m-2">
            <LinkAsButton href="/createquiz">Create quiz</LinkAsButton>
          </div>
          <div className="m-2">
            <LinkAsButton href="/randomquiz" variant="secondary">
              Random quiz
            </LinkAsButton>
          </div>
        </div>
      </section>
      <section className="min-h-[200px] ">
        <h2 className="text-center text-4xl font-bold">Most popular</h2>
        <div className="mt-12">
          {popularQuizzes.map((quiz) => (
            <div className="m-auto my-5 w-[650px] max-w-full" key={quiz.title}>
              <QuizButton
                title={quiz.title}
                questionsCount={quiz.questionsCount}
              />
              {console.log(quiz)}
            </div>
          ))}
        </div>
      </section>
    </Layout>
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
  return {
    props: {
      popularQuizzes: sortedPopularQuizzes, // 3 quizzes with the most results
    },
    revalidate: 300,
  };
};
export default Landing;
