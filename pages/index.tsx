import React from "react";
import Head from "next/head";

import Layout from "../components/Layout";
import QuizButton from "../components/QuizButton";
import LinkAsButton from "../components/LinkAsButton";

const Landing = () => {
  const mockData = [
    { name: "Pokemon quiz", questions: 5 },
    { name: "YouTube quiz", questions: 12 },
  ];

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
          {mockData.map((quiz) => (
            <div className="m-auto my-5 w-[650px] max-w-full" key={quiz.name}>
              <QuizButton name={quiz.name} questions={quiz.questions} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
