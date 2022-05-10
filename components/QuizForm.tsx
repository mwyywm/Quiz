// react hook form import
import { useForm, useFieldArray, appendErrors } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import clsx from "clsx";
interface answerAmountType {
  init: undefined[];
  [key: string]: undefined[] | [undefined];
}

export default function App() {
  const { register, control, handleSubmit, watch, setFocus } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const [answerAmount, setAnswerAmount] = useState<answerAmountType>({
    init: [undefined, undefined],
  });
  const [data, setData] = useState(null);
  const onSubmit = (data: any) => {
    setData(data);
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
      <h1 className="mt-4 text-lg text-white">QuizForm</h1>
      <form
        className="flex w-full flex-col text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DevTool control={control} />
        <input
          placeholder="title"
          {...register("title", { required: true })}
          className="mb-2 h-10 w-full pl-1"
        />
        <input
          placeholder="description"
          {...register("description", { required: true })}
          className="h-10 w-full pl-1"
        />
        {fields.map((field: any, index: number) => (
          <React.Fragment key={index}>
            <label className="mt-4 text-lg text-white">
              Question {index + 1}
            </label>
            <input
              placeholder={`question ${index + 1}`}
              {...register(`questions[${index}].question`, { required: true })}
              className="mb-2 h-10 w-full pl-1"
            />
            {(answerAmount[field.id] || answerAmount.init || ["", ""]).map(
              (val, i: number) => (
                <div className="flex items-center justify-center" key={i}>
                  <input
                    placeholder={`answer ${i + 1}`}
                    {...register(`questions[${index}].answer[${i}]`, {
                      required: true,
                    })}
                    className="my-1 h-10 w-full pl-1"
                  />
                  <input
                    type="radio"
                    value={watch(`questions[${index}].answer[${i}]`)}
                    {...register(`questions[${index}].correctAnswer`, {
                      required: true,
                    })}
                  />
                </div>
              )
            )}
            <div className="flex w-full items-center justify-center">
              {!(answerAmount[field.id]?.length === 4) && (
                <input
                  value="Add answer"
                  className="my-1 mr-1 w-full cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]"
                  onClick={() => handleNewQuestion(field.id)}
                />
              )}
              <input
                value={`Remove question ${index + 1}`}
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
          className="my-1 cursor-pointer rounded-sm bg-amber-500 px-4 py-2 text-center text-black transition-colors hover:bg-[#ffad21]"
          onClick={() => {
            append({ question: "", answer: [] });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              append({ question: "", answer: [] });
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
