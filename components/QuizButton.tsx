interface Props {
  title: string;
  questionsCount: number;
}

const QuizButton = ({ title, questionsCount }: Props) => {
  return (
    <button className="flex h-16 w-full items-center justify-between bg-amber-500 p-4 text-black transition-colors hover:bg-[#ffad21]">
      <p className="text-xl">{title}</p>
      <p className="text-xl">{questionsCount} questions</p>
    </button>
  );
};

export default QuizButton;
