import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

const Landing = () => {
  return (
    <Layout>
      <div>
        <div className="max-w-full w-[650px] mx-auto ">
          <h1 className="text-center text-5xl font-semibold antialiased">
            Voluptate dicta sed eveniet dolores qui. Eveniet quisquam quisquam!
          </h1>
          <p className="text-center text-xl font-normal mt-5 text-gray-300 antialiased">
            Take a quiz from the list below or create your own! See how you
            score compared to everyone else.
          </p>
        </div>
        <div>
          <Button>Create quiz</Button>
          <Button>hello</Button>
          <Button variant="secondary">hello</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
