import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

const Landing = () => {
  return (
    <Layout>
      <div>
        <section>
          <div className="mx-auto w-[650px] max-w-full">
            <h1 className="text-center text-5xl font-bold antialiased">
              Create your own quiz!
            </h1>
            <p className="mt-5 text-center text-xl font-normal text-gray-300 antialiased">
              Complete a quiz from the list below or create your own! See how
              you score compared to everyone else.
            </p>
          </div>
          <div className="mx-auto mt-4 flex w-[300px] justify-between">
            <Button>Create quiz</Button>
            <Button variant="secondary">hello</Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Landing;
