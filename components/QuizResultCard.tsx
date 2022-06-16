interface Props {
  result: ResultType;
  showDate?: boolean;
}
interface ResultType {
  id: number;
  username: string;
  createdAt: Date;
  score: number;
  total: number;
}

const useTimeAgo = (date: Date) => {
  const createdDate = new Date(date);
  const now = new Date();
  const diff = now.getTime() - createdDate.getTime();
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // if it is less than a minute we show "Just now".
  if (weeks > 0) {
    return weeks > 1 ? `${weeks} weeks ago` : `${weeks} week ago`;
  } else if (days > 0) {
    return days > 1 ? `${days} days ago` : `${days} day ago`;
  } else if (hours > 0) {
    return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
  } else if (minutes > 0) {
    return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
  } else {
    return "Just now";
  }
};

const QuizResultCard = ({ result, showDate = false }: Props) => {
  const resultCreatedAt = useTimeAgo(result.createdAt);

  return (
    <div className="flex max-w-full items-center justify-between bg-white p-2 py-4 text-black">
      <div className="flex w-[55%] flex-col break-words">
        <p className="text-left text-xl">{result.username}</p>
        {showDate && (
          <p className="text-md text-left text-gray-500">{resultCreatedAt}</p>
        )}
      </div>
      <p className="max-w-[45%] break-words text-right text-xl">
        {result.score * 100} points
      </p>
    </div>
  );
};

export default QuizResultCard;
