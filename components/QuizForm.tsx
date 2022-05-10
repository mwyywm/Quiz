// react hook form import
import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
interface answerAmountType {
  init: undefined[];
  [key: string]: undefined[] | [undefined];
}

export default function App() {
  const { register, control, handleSubmit, watch } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const [answerAmount, setAnswerAmount] = useState<answerAmountType>({
    init: [undefined, undefined],
  });
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

  const [data, setData] = useState(null);
  return (
    <>
      <h1 className="mt-4 text-lg text-white">QuizForm</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col text-black"
      >
        <input
          placeholder="quiztitle"
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
              {...register(`questions[${index}].question`, {})}
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

            {!(answerAmount[field.id]?.length === 4) && (
              <button
                className="my-1 rounded-sm bg-amber-500 px-4 py-2 text-black transition-colors hover:bg-[#ffad21]"
                onClick={() => handleNewQuestion(field.id)}
              >
                Add another answer
              </button>
            )}
            <button
              className="my-1 rounded-sm bg-amber-500 px-4 py-2 text-black transition-colors hover:bg-[#ffad21]"
              onClick={() => remove(index)}
            >
              Remove question {index + 1}
            </button>
          </React.Fragment>
        ))}
        <button
          className="text-white"
          onClick={() => {
            append({ id: "hey", question: "", answer: [] });
          }}
        >
          New question
        </button>
        <input className="text-white" type="submit" />
      </form>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
