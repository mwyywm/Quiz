import React, { useState, useEffect } from "react";
import FadeInFadeOut from "./Animation/FadeInFadeOut";
import { CopiedObjTypes } from "./QuizCreated";
import clsx from "clsx";
import CheckIcon from "./SVG/CheckIcon";
import CopyIcon from "./SVG/CopyIcon";

import { usePopper } from "react-popper";
import Portal from "./Portal";

interface Props {
  slug: string;
  isOpen: boolean;
  setCopiedObj: React.Dispatch<React.SetStateAction<CopiedObjTypes>>;
  linkType: "quiz" | "results";
}
const LinkQuiz = ({ slug, setCopiedObj, linkType }: Props) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const [showPopper, setShowPopper] = useState(false);
  const [clicked, setClicked] = useState(false);

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/quiz/${str}`);
  };

  useEffect(() => {
    // resetting clicked state to false
    if (clicked) {
      const timer = setTimeout(() => {
        setClicked(false);
        if (referenceElement?.dataset.name) {
          const name = referenceElement?.dataset.name;
          setCopiedObj((prevState: CopiedObjTypes) => ({
            ...prevState,
            [name]: false,
          }));
        }
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [clicked]);

  return (
    <>
      <div
        role="button"
        className={clsx(
          "m-auto my-2 flex w-80 max-w-full cursor-pointer items-center justify-between rounded border border-[#5c6070] bg-[#40434f] p-1"
        )}
        ref={(el) => setReferenceElement(el)}
        onClick={() => {
          copyToClipboard(slug);
          setClicked(true);
        }}
        onMouseEnter={(e) => {
          setReferenceElement(e.currentTarget);
          setShowPopper(true);
        }}
        onMouseLeave={() => {
          setReferenceElement(null);
          setShowPopper(false);
        }}
        onFocus={(e) => {
          setReferenceElement(e.currentTarget);
          setShowPopper(true);
        }}
        onBlur={() => {
          setReferenceElement(null);
          setShowPopper(false);
        }}
        data-name={linkType}
      >
        <p className="h-8 w-full cursor-pointer truncate bg-[#40434f] pr-1 text-white focus:outline-none">{`${window.location.origin}/quiz/${slug}`}</p>
        <div className="flex h-8 w-7 items-center justify-center">
          <FadeInFadeOut
            isOpen={clicked}
            falseChild={<CopyIcon fill="white" />}
            trueChild={<CheckIcon fill="white" />}
          />
        </div>
      </div>
      <Portal>
        {showPopper && (
          <div
            ref={setPopperElement}
            style={styles.popper}
            className="bottom-0 flex w-auto items-end justify-center"
            role="tooltip"
            {...attributes.popper}
          >
            <FadeInFadeOut
              isOpen={clicked}
              falseChild={
                <>
                  <div className="shadow-top-sm z-50 w-[150px] max-w-full rounded bg-[#40434f] p-1.5">
                    <p className="text-center text-white">Copy to clipboard!</p>
                  </div>
                  <div className="z-40 m-auto -mt-1.5 h-3 w-3 rotate-45 bg-[#40434f]" />
                </>
              }
              trueChild={
                <>
                  <div className="shadow-top-sm z-50 w-[150px] max-w-full rounded bg-[#40434f] p-1.5">
                    <p className="text-center text-white">Copied!</p>
                  </div>
                  <div className="z-40 m-auto -mt-1.5 h-3 w-3 rotate-45 bg-[#40434f]" />
                </>
              }
            />
          </div>
        )}
      </Portal>
    </>
  );
};
export default LinkQuiz;
