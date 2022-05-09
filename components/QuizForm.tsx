// react hook form import
import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";

export default function QuizForm() {
  const { register, control, handleSubmit, reset, watch } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setData(data);
  };
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
            {Array.from({ length: 4 }).map((val, i: number) => (
              <React.Fragment key={i}>
                <input
                  placeholder={`questions[${index}].answer[${JSON.stringify(
                    field.id
                  )}]`}
                  {...register(`questions[${index}].answer[${i}]`, {})}
                />
                <input
                  type="radio"
                  value={watch(`questions[${index}].answer[${i}]`)}
                  {...register(`questions[${index}].correctAnswer`, {})}
                />
              </React.Fragment>
            ))}
            <button className="text-white" onClick={() => remove(index)}>
              Remove
            </button>
          </React.Fragment>
        ))}
        <button
          className="text-white"
          onClick={() => {
            append({});
          }}
        >
          append
        </button>
        <input className="text-white" type="submit" />
      </form>
      <code>{JSON.stringify(data)}</code>
    </>
  );
}
