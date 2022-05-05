import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import QuizButton from "../components/QuizButton";

const Landing = () => {
  const mockData = [
    { name: "Pokemon quiz", questions: 5 },
    { name: "YouTube quiz", questions: 12 },
  ];
  return (
    <Layout>
      <section className="mb-24">
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
            <Button>Create quiz</Button>
          </div>
          <div className="m-2">
            <Button variant="secondary">Random quiz</Button>
          </div>
        </div>
      </section>
      <section className="min-h-[200px] ">
        <h2 className="text-center text-4xl font-bold">Most popular</h2>
        <div className="mt-12">
          {mockData.map((quiz) => (
            <div className="m-auto my-5 w-[650px] max-w-full">
              <QuizButton name={quiz.name} questions={quiz.questions} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
