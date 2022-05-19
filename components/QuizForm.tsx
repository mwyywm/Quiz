// react hook form import
import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
interface answerAmountType {
  init: undefined[];
  [key: string]: undefined[] | [undefined];
}
interface QuizFormProps {
  setSentFormData: (data: any) => void;
}

export default function QuizForm({ setSentFormData }: QuizFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    formState,
    reset,
    watch,
    trigger,
  } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  // in answerAmount we have an array for every field.id we have in the form.
  // answerAmount[field.id] holds an array of undefined values. The length of this array is the amount of answers for that field.
  const [answerAmount, setAnswerAmount] = useState<answerAmountType>({
    init: [undefined, undefined],
  });
  const [data, setData] = useState({});
  const questionsArr = watch("questions");
  const onSubmit = async (data: any) => {
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
    await fetch("/api/newquiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        questions: formattedQuestions,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setSentFormData(data); // passing the response object to the parent component
        return clearErrors("post");
      })
      .catch((err) => {
        reset({
          title: "",
        });
        setError("post", {
          type: "custom",
          message: "Title already exists. Please choose another title.",
        });
        return trigger("title", { shouldFocus: true });
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
    // fill answerAmount state with ids when we add a new question
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
    // handling errors when we dont have a question in the form
    if (questionsArr?.length === 0) {
      return setError("submit", {
        type: "custom",
        message: "Please add a question",
      });
    } else if (questionsArr?.length > 0) {
      clearErrors("submit");
    }
  }, [questionsArr]);
  useEffect(() => {
    // appending initial question 1 to the form
    append({ question: "", answers: [] });
    // focus form title on component render
    setFocus("title");
  }, []);
  return (
    <>
      <h2 className="mt-4 text-lg text-white">New quiz</h2>
      <form
        className="flex w-full flex-col text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Title"
          onInput={() => clearErrors("post")}
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
          className={clsx(
            "mt-1 h-10 w-full rounded-sm pl-1",
            "focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-gray-400"
          )}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        {formState.errors.title && (
          <p className="text-red-500">{formState.errors.title.message}</p>
        )}
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
          className={clsx(
            "mt-2 h-10 w-full rounded-sm pl-1",
            "focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-gray-400"
          )}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        {formState.errors.description?.message && (
          <p className="text-red-500">{formState.errors.description.message}</p>
        )}
        {fields.map((field, index: number) => (
          <React.Fragment key={field.id}>
            <label className="mt-4 text-lg text-white">
              Question {index + 1}
            </label>
            <input
              placeholder={`question ${index + 1}`}
              {...register(`questions[${index}].question`, {
                required: "Question is required",
              })}
              className={clsx(
                "my-1  h-10 w-full rounded-sm pl-1",
                "focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-gray-400"
              )}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            {formState.errors.questions?.[index] && (
              <p className="text-red-500">
                {formState.errors.questions?.[index]?.question?.message}
              </p>
            )}
            {(answerAmount[field.id] || answerAmount.init).map(
              (val, i: number) => (
                <React.Fragment key={field.id + i}>
                  <div className="flex items-center justify-center">
                    <input
                      placeholder={`answer ${i + 1}`}
                      {...register(`questions[${index}].answers[${i}]`, {
                        required: "Answer is required",
                      })}
                      className={clsx(
                        "my-1 mt-2 h-10 w-full rounded-sm pl-1",
                        "focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-gray-400"
                      )}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                    <input
                      type="radio"
                      value={i}
                      style={{ accentColor: "#FFAD21" }}
                      className={clsx("form-radio mx-2 h-5 w-5 ")}
                      {...register(`questions[${index}].correctAnswer`, {
                        required:
                          "You must select a correct answer for this question",
                      })}
                      onKeyDown={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                    />
                  </div>
                  {formState.errors.questions?.[index] && (
                    <p className="text-red-500">
                      {
                        formState.errors.questions?.[index].answers?.[i]
                          ?.message
                      }
                    </p>
                  )}
                </React.Fragment>
              )
            )}
            {formState.errors.questions?.[index] && (
              <p className="text-red-500">
                {formState.errors.questions?.[index].correctAnswer?.message}
              </p>
            )}
            <div
              className={clsx(
                "flex w-full flex-col items-center justify-center",
                "xs:flex-row"
              )}
            >
              {!(answerAmount[field.id]?.length === 4) && (
                <input
                  value="Add answer"
                  readOnly
                  className={clsx(
                    "my-1 mr-0 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]",
                    "xs:mr-1"
                  )}
                  onClick={() => handleNewQuestion(field.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNewQuestion(field.id);
                    }
                  }}
                />
              )}
              <input
                value={`Remove question ${index + 1}`}
                readOnly
                className={clsx(
                  "my-1 ml-0 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]",
                  "xs:ml-1",
                  {
                    "ml-0": answerAmount[field.id]?.length === 4, // resetting margin left when we only show 1 element
                  }
                )}
                onClick={() => remove(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    remove(index);
                  }
                }}
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
              e.preventDefault();
              append({ question: "", answers: [] });
            }
          }}
        />
        {formState.errors.submit && (
          <p className="text-red-500">{formState.errors.submit?.message}</p>
        )}
        {formState.errors.post && (
          <p className="text-red-500">{formState.errors.post?.message}</p>
        )}
        <button
          className={clsx(
            "my-1 rounded-sm bg-amber-500 px-4 py-2 text-black transition-colors hover:bg-[#ffad21]",
            {
              ["cursor-pointer"]: formState.isValid,
            }
          )}
          type="submit"
          onClick={() => {
            if (formState.isValid) {
              handleSubmit(onSubmit);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSubmit);
            }
          }}
        >
          {formState.isSubmitSuccessful ? "Submitted!" : "Submit"}
        </button>
      </form>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
