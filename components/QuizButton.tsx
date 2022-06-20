import Link from "next/link";

interface Props {
  title: string;
  questionsCount: number;
  slug: string;
}

const QuizButton = ({ title, questionsCount, slug }: Props) => {
  return (
    <Link href={`/quiz/${slug}`}>
      <a className="flex h-auto min-h-[64px] w-full flex-col items-center justify-between bg-amber-500 p-4 text-black transition-colors hover:bg-[#ffad21] xs:flex-row">
        <p className="h-auto w-full break-words text-center text-xl font-semibold xs:w-auto xs:min-w-[60%] xs:truncate xs:pr-2 xs:text-left xs:font-normal">
          {title}
        </p>
        <p className="text-center text-xl xs:min-w-fit xs:text-right">
          {questionsCount} questions
        </p>
      </a>
    </Link>
  );
};

export default QuizButton;
