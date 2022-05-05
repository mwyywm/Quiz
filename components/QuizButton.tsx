interface Props {
  name: string;
  questions: number;
}

const QuizButton = ({ name, questions }: Props) => {
  return (
    <div className="flex justify-between bg-amber-500 p-4 text-black">
      <p>{name}</p>
    </div>
  );
};

export default QuizButton;
