import React from "react";
import Layout from "./Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/router";
import { QuizType, AnswersObjState } from "../pages/quiz/[slug]";

interface Props {
  quiz: QuizType;
  answersObj: AnswersObjState;
}

type Inputs = {
  username: string;
};

const SubmittingQuiz = ({ quiz, answersObj }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    const { username } = data;
    await fetch(`/api/quiz/${quiz.slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ ...answersObj, username }),
    }).then((res) => {
      if (res.ok) {
        router.push(`/quiz/${quiz.slug}/results?user=${username}`);
      } else {
        // TODO: handle error
        alert("Error submitting!");
      }
    });
  };

  return (
    <Layout>
      <div className="mx-auto w-[650px] max-w-full">
        <h1 className="mb-9 text-center text-5xl font-bold antialiased">
          {quiz.title}
        </h1>
        <p className="mx-auto mb-5 w-[550px] max-w-full text-center text-xl font-normal text-gray-300 antialiased">
          To see your final score please write your username and then submit.
          Your username and score can be viewed by anyone.
        </p>
        <form className="mb-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="m-auto h-20 w-full sm:w-60">
            <input
              className={clsx(
                "mb-2 w-full rounded-sm p-2 text-black sm:rounded-sm",
                "focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-gray-400"
              )}
              placeholder="Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Please enter a username",
                },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters",
                },
              })}
            />
            {errors.username && (
              <p className="w-full text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              disabled={isSubmitting || isSubmitSuccessful}
              type="submit"
              className={clsx(
                "h-16 w-32 rounded-md bg-white p-2 text-lg font-normal text-black transition-colors duration-200 ease-in-out",
                "hover:bg-gray-300 disabled:bg-gray-300"
              )}
            >
              {isSubmitting ? <LoadingSpinner /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default SubmittingQuiz;
