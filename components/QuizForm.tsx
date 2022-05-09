// react hook form import
import { useForm, useFieldArray } from "react-hook-form";
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
      <h1>QuizForm</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-black"
      >
        <input
          placeholder="quiztitle"
          {...register("title", { required: true })}
        />
        <input
          placeholder="description"
          {...register("description", { required: true })}
        />
        {fields.map((field: any, index: number) => (
          <React.Fragment key={index}>
            <input
              placeholder={`questions[${index}].question[${JSON.stringify(
                field.id
              )}]}`}
              {...register(`questions[${index}].question`, {})}
            />
            {(answerAmount[field.id] || answerAmount.init || ["", ""]).map(
              (val, i: number) => (
                <div className="flex justify-center" key={i}>
                  <input
                    placeholder={`questions[${index}].answer[${JSON.stringify(
                      field.id
                    )}]`}
                    {...register(`questions[${index}].answer[${i}]`, {
                      required: true,
                    })}
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
            <button
              className="text-white"
              onClick={() => handleNewQuestion(field.id)}
            >
              Add another answer
            </button>
            <button className="text-white" onClick={() => remove(index)}>
              Remove question
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
