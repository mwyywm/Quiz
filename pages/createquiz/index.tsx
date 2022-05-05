import Layout from "../../components/Layout";
import QuizForm from "../../components/QuizForm";

const CreateQuizPage = () => {
  return (
    <Layout>
      <section className="mb-24">
        <div className="mx-auto w-[650px] max-w-full">
          <h1 className="text-center text-5xl font-bold antialiased">
            Create a quiz!
          </h1>
          <p className="mx-auto mt-5 w-[550px] max-w-full text-left text-xl font-normal text-gray-300 antialiased">
            With the form below you can create your own quiz. You can add as
            many questions as you want. The quiz can have from 2 to 4 answers
            per question. After you submit a quiz you will get a link that you
            can share.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto w-[650px] max-w-full">
          <QuizForm />
        </div>
      </section>
    </Layout>
  );
};
export default CreateQuizPage;
