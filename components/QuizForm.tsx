// react hook form import
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import clsx from "clsx";
interface answerAmountType {
  init: undefined[];
  [key: string]: undefined[] | [undefined];
}
interface QuizFormProps {
  setSentFormData: (data: any) => void;
}

interface DataTypes {
  title: string;
  description: string;
  questions: QuestionsType[];
}

interface QuestionsType {
  question: string;
  correctAnswer: string;
  answers: string[];
}

export default function QuizForm({ setSentFormData }: QuizFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState,
    resetField,
    trigger,
    setFocus,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      post: { message: undefined, error: undefined, type: undefined },
      submit: { message: undefined, error: undefined, type: undefined },
      questions: [
        // initially empty strings in input fields
        {
          question: "",
          correctAnswer: "",
          answers: ["", ""], // 2 answers initially
        },
      ],
    },
  });
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
  const onSubmit = async (data: any) => {
    // looping over the questions array and adding the correctAnswer as a string
    const formattedQuestions = data.questions.map(
      (obj: QuestionsType, i: number) => {
        return {
          ...obj,
          correctAnswer: data.questions[i].answers[Number(obj.correctAnswer)],
        };
      }
    );
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
          throw new Error("Something went wrong"); // the server errors out
        }
        return res.json();
      })
      .then((data: DataTypes) => {
        setSentFormData(data); // passing the response object to the parent component
        return clearErrors("post");
      })
      .catch((err) => {
        resetField("title");
        setError("post", {
          type: "custom",
          message: "Title already exists. Please choose another title.",
        });
        return trigger("title", { shouldFocus: true });
      });
  };
  const handleNewAnswer = (id: string) => {
    // add a new answer to the array of answers for the question with the same id
    // starts with 2 answers, total of 4.
    const AddQuestion = (count: number) => {
      if (count >= 2 && count < 4) {
        return count + 1;
      } else if (count === 4) {
        return 4;
      }
    };
    setAnswerAmount((prev) => ({
      ...prev,
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
  return (
    <>
      <h2 className="mt-4 text-lg text-white">New quiz</h2>
      <form
        className="flex w-full flex-col text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Title"
          aria-label="Title"
          onInput={() => {
            clearErrors("post");
          }}
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
            "mt-1 h-10 w-full rounded border border-[#5c6070] bg-[#40434f] pl-1 text-white",
            "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-500"
          )}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        {formState.errors.title && (
          <p className="text-red-500" role="alert">
            {formState.errors.title.message}
          </p>
        )}
        <input
          placeholder="Description"
          aria-label="Description"
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
            "mt-2 h-10 w-full rounded border border-[#5c6070] bg-[#40434f] pl-1 text-white",
            "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-500"
          )}
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        />
        {formState.errors.description?.message && (
          <p className="text-red-500" role="alert">
            {formState.errors.description.message}
          </p>
        )}
        {fields.map((field, index: number) => (
          <React.Fragment key={field.id}>
            <label className="mt-4 text-lg text-white">
              Question {index + 1}
            </label>
            <input
              placeholder={`Question ${index + 1}`}
              aria-label={`Question ${index + 1}`}
              {...register(`questions.${index}.question`, {
                required: "Question is required",
              })}
              className={clsx(
                "mt-2 h-10 w-full rounded border border-[#5c6070] bg-[#40434f] pl-1 text-white",
                "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-500"
              )}
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            {formState.errors.questions?.[index] && (
              <p className="text-red-500" role="alert">
                {formState.errors.questions?.[index]?.question?.message}
              </p>
            )}
            <div className="mb-1">
              {(answerAmount[field.id] || answerAmount.init).map(
                (_, i: number) => (
                  <React.Fragment key={field.id + i}>
                    <div className="mt-2 flex items-center justify-center">
                      <input
                        placeholder={`Answer ${i + 1}`}
                        aria-label={`Answer ${i + 1}`}
                        {...register(`questions.${index}.answers.${i}`, {
                          required: "Answer is required",
                        })}
                        className={clsx(
                          "h-10 w-full rounded border border-[#5c6070] bg-[#40434f] pl-1 text-white",
                          "focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-amber-500"
                        )}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                          if (formState.errors.questions?.[index]?.answers) {
                            trigger(`questions.${index}.answers`);
                          }
                        }}
                      />
                      <input
                        type="radio"
                        aria-label="Correct answer"
                        value={i}
                        className={clsx(
                          "ml-2 h-6 w-6 appearance-none rounded-full border-2 border-[#5c6070] bg-[#40434f] checked:bg-amber-500",
                          "focus:outline-1 focus:outline-amber-500"
                        )}
                        {...register(`questions.${index}.correctAnswer`, {
                          required:
                            "You must select a correct answer for this question",
                        })}
                        onKeyDown={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                      />
                    </div>
                    {formState.errors.questions?.[index] && (
                      <p className="text-red-500" role="alert">
                        {
                          formState.errors.questions?.[index]?.answers?.[i]
                            ?.message
                        }
                      </p>
                    )}
                  </React.Fragment>
                )
              )}
            </div>

            {formState.errors.questions?.[index] && (
              <p className="text-red-500" role="alert">
                {formState.errors.questions?.[index]?.correctAnswer?.message}
              </p>
            )}
            <div
              className={clsx(
                "flex w-full flex-col items-center justify-center",
                "xs:flex-row"
              )}
            >
              {!(answerAmount[field.id]?.length === 4) && (
                <div
                  role="button"
                  aria-label="Add answer"
                  tabIndex={0}
                  className={clsx(
                    "my-1 mr-0 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors",
                    "hover:bg-[#ffad21]",
                    index === 0 ? "mr-0 xs:mr-0" : "xs:mr-1"
                  )}
                  onClick={() => {
                    handleNewAnswer(field.id);
                    trigger(`questions.${index}.answers`, {
                      shouldFocus: true,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNewAnswer(field.id);
                      trigger(`questions.${index}.answers`, {
                        shouldFocus: true,
                      });
                    }
                  }}
                >
                  Add answer
                </div>
              )}
              {fields.length > 1 && (
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove question ${index + 1}`}
                  className={clsx(
                    "my-1 ml-0 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]",
                    answerAmount[field.id]?.length === 4 ? "xs:ml-0" : "xs:ml-1" // when showing remove button, remove the xs:ml-1 class
                  )}
                  onClick={() => remove(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      remove(index);
                      if (index === 0) {
                        // focus the new index 0 question
                        setFocus(`questions.${0}.question`);
                      } else {
                        // focus the question that is above the removed question
                        setFocus(`questions.${index - 1}.question`);
                      }
                    }
                  }}
                >
                  Remove question {index + 1}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
        <div
          role="button"
          tabIndex={0}
          aria-label="Add new question"
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
        >
          Add question
        </div>
        {formState.errors.submit && (
          <p className="text-red-500" role="alert">
            {formState.errors.submit?.message}
          </p>
        )}
        {formState.errors.post && (
          <p className="text-red-500" role="alert">
            {formState.errors.post?.message}
          </p>
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
    </>
  );
}
