import { useTransition, animated } from "@react-spring/web";

interface Props {
  isOpen: boolean;
  trueChild: React.ReactNode;
  falseChild: React.ReactNode;
}
// trueChild renders if isOpen is true
// falseChild renders if isOpen is false

export default function FadeInFadeOut({
  isOpen,
  trueChild,
  falseChild,
}: Props) {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isOpen,
    config: { mass: 1, tension: 120, friction: 14 }, // https://react-spring.io/common/configs
  });
  return transitions(({ opacity }, item: any) =>
    item ? (
      <animated.div
        style={{
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
          position: "absolute",
        }}
      >
        {trueChild}
      </animated.div>
    ) : (
      <animated.div
        style={{
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
          position: "absolute",
        }}
      >
        {falseChild}
      </animated.div>
    )
  );
}
