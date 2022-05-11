// react hook form import
import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import clsx from "clsx";
interface answerAmountType {
  init: undefined[];
  [key: string]: undefined[] | [undefined];
}

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  console.log(errors);
  // in answerAmount we have an array for every field.id we have in the form.
  // answerAmount[field.id] holds an array of undefined values. The length of this array is the amount of answers for that field.
  const [answerAmount, setAnswerAmount] = useState<answerAmountType>({
    init: [undefined, undefined],
  });

  const [data, setData] = useState({});
  const onSubmit = (data: any) => {
    // looping over the questions array and adding the correctAnswer as a string
    const formattedQuestions = data.questions.map((obj: any, i: number) => {
      return {
        ...obj,
        correctAnswer: data.questions[i].answers[Number(obj.correctAnswer)],
      };
    });
    setData({
      title: data.title,
      description: data.description,
      questions: formattedQuestions,
    });

    fetch("/api/newquiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        questions: formattedQuestions,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewQuestion = (id: string) => {
    const AddQuestion = (arrLen: number): number | undefined => {
      if (arrLen >= 2 && arrLen < 4) {
        return arrLen + 1;
      } else if (arrLen === 4) {
        return 4;
      }
      return;
    };
    setAnswerAmount((prevState) => ({
      ...prevState,
      [id]: Array.from({
        length: AddQuestion(answerAmount[id]!.length) as number,
      }),
    }));
  };
  useEffect(() => {
    // fill state with ids when we add a new field
    const fieldIds = () => fields.map((x) => x.id.toString());
    for (const elem of fieldIds()) {
      if (!answerAmount[elem]) {
        setAnswerAmount((prevState) => ({
          ...prevState,
          [elem]: Array.from({ length: 2 }),
        }));
      }
    }
  }, [fields]);
  useEffect(() => {
    setFocus("title");
  }, []);

  return (
    <>
      <DevTool control={control} />
      <h1 className="mt-4 text-lg text-white">QuizForm</h1>
      <form
        className="flex w-full flex-col text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Title"
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 60,
              message: "Title must be 60 characters or less",
            },
            minLength: {
              value: 4,
              message: "Title must be at least 4 characters",
            },
            pattern: {
              value: /^[a-zA-Z0-9 ]*$/,
              message: "Title must be alphanumeric.",
            },
          })}
          className="h-10 w-full pl-1"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <input
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 5,
              message: "Description must be at least 5 characters",
            },
            maxLength: {
              value: 150,
              message: "Description must be 150 characters or less",
            },
          })}
          className="mt-2 h-10 w-full pl-1"
        />
        {errors.description?.message && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        {fields.map((field, index: number) => (
          <React.Fragment key={index}>
            <label className="mt-4 text-lg text-white">
              Question {index + 1}
            </label>
            <input
              placeholder={`question ${index + 1}`}
              {...register(`questions[${index}].question`, {
                required: "Question is required",
              })}
              className="h-10 w-full pl-1"
            />
            {errors.questions?.[index] && (
              <p className="text-red-500">
                {errors.questions?.[index]?.question?.message}
              </p>
            )}
            {(answerAmount[field.id] || answerAmount.init).map(
              (val, i: number) => (
                <>
                  <div className="flex items-center justify-center" key={i}>
                    <input
                      placeholder={`answer ${i + 1}`}
                      {...register(`questions[${index}].answers[${i}]`, {
                        required: "Answer is required",
                      })}
                      className="my-1 mt-2 h-10 w-full pl-1"
                    />
                    <input
                      type="radio"
                      value={i}
                      {...register(`questions[${index}].correctAnswer`, {
                        required:
                          "You must select a correct answer for this question",
                      })}
                    />
                  </div>
                  {errors.questions?.[index] && (
                    <p className="text-red-500">
                      {errors.questions?.[index].answers?.[i]?.message}
                    </p>
                  )}
                </>
              )
            )}
            {errors.questions?.[index] && (
              <p className="text-red-500">
                {errors.questions?.[index].correctAnswer?.message}
              </p>
            )}
            <div className="flex w-full items-center justify-center">
              {!(answerAmount[field.id]?.length === 4) && (
                <input
                  value="Add answer"
                  readOnly
                  className="my-1 mr-1 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]"
                  onClick={() => handleNewQuestion(field.id)}
                />
              )}
              <input
                value={`Remove question ${index + 1}`}
                readOnly
                className={clsx(
                  "my-1 ml-1 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]",
                  {
                    "ml-0": answerAmount[field.id]?.length === 4, // resetting margin left when we only show 1 element
                  }
                )}
                onClick={() => remove(index)}
              />
            </div>
          </React.Fragment>
        ))}
        <input
          value="Add question"
          readOnly
          className="my-1 cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]"
          onClick={() => {
            append({ question: "", answers: [] });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              append({ question: "", answers: [] });
            }
          }}
        />
        <button
          className="my-1 cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-black transition-colors hover:bg-[#ffad21]"
          type="submit"
          onClick={() => {
            handleSubmit(onSubmit);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(onSubmit);
            }
          }}
        >
          Submit
        </button>
      </form>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
