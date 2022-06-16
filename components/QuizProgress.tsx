import { useSpring, animated, config } from "@react-spring/web";
interface Props {
  current: number;
  total: number;
}
const QuizProgress = ({ current, total }: Props) => {
  const progressPercentage = (current / total) * 100;
  const previusProgressPercentage = (current - 1 / total) * 100;
  const numberSpring = useSpring({
    number: progressPercentage
      ? progressPercentage
      : previusProgressPercentage || 0,
    config: {
      duration: 500,
      bezier: [0.42, 0, 0.58, 1.0], // equivalent to ease-in-out
    },
  });

  return (
    <>
      <div className="mb-1 flex justify-between">
        <p className="text-lg font-normal">
          Question {current}/{total}
        </p>
        <p className="text-lg font-normal">
          <animated.span>
            {numberSpring.number.to((x) => x.toFixed(0))}
          </animated.span>
          %
        </p>
        {/* <p className="text-lg font-normal">{(current / total) * 100}%</p> */}
      </div>
      <div className="mb-1 h-4 w-full rounded-lg bg-gray-700">
        <div
          className="ease h-4 rounded-lg bg-amber-500"
          style={{
            width: `${progressPercentage}%`,
            transition: "width 0.5s",
            transitionTimingFunction: "ease-in-out",
          }}
        />
      </div>
    </>
  );
};

export default QuizProgress;
