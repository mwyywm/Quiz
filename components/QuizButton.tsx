interface Props {
  name: string;
  questions: number;
}

const QuizButton = ({ name, questions }: Props) => {
  return (
    <button className="flex h-16 w-full items-center justify-between bg-amber-500 p-4 text-black transition-colors hover:bg-[#ffad21]">
      <p className="text-xl">{name}</p>
      <p className="text-xl">{questions} questions</p>
    </button>
  );
};

export default QuizButton;
