interface Props {
  name: string;
  score: number;
}

const QuizResultCard = ({ name, score }: Props) => {
  return (
    <div className="flex max-w-full items-center justify-between bg-white p-2 py-4 text-black">
      <p className="w-[75%] break-words text-xl">{name}</p>
      <p className="max-w-[25%] break-words text-xl">{score * 100} points</p>
    </div>
  );
};

export default QuizResultCard;
