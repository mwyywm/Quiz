import React, { forwardRef, useEffect, useLayoutEffect, useState } from "react";
import { CopiedObjTypes } from "./QuizCreated";
import FadeInFadeOut from "./Animation/FadeInFadeOut";
import Portal from "./Portal";


interface TooltipProps {
  children: React.ReactNode;
  text: string;
  setCopiedObj: React.Dispatch<React.SetStateAction<CopiedObjTypes>>;
  clickedText?: string;
}

interface ElementRectTypes {
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

const Tooltip = forwardRef(
  (
    {
      children,
      text = "Copy to clipboard",
      clickedText = "Copied!",
      setCopiedObj,
    }: TooltipProps,
    ref: React.ForwardedRef<Element>
  ) => {
    const [elementRect, setElementRect] = useState<
      ElementRectTypes | undefined
    >(undefined);
    const [show, setShow] = useState(false);
    const [clicked, setClicked] = useState(false);

    const name =
      ref && "current" in ref && ref.current?.getAttribute("data-name");

    // on windows resize we need to recalculate the elementRect
    useLayoutEffect(() => {
      if (ref && "current" in ref && ref.current) {
        setElementRect(ref.current.getBoundingClientRect());
      }
      window.addEventListener("resize", () => {
        if (ref && "current" in ref && ref.current) {
          setElementRect(ref.current.getBoundingClientRect());
        }
      });
      return () => {
        window.removeEventListener("resize", () => {});
      };
    }, [ref]);
    useEffect(() => {
      if (clicked) {
        const timer = setTimeout(() => {
          setClicked(false);
          if (name) {
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
      <React.Fragment>
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          onClick={() => {
            setClicked(true);
            if (name) {
              setCopiedObj((prevState) => ({
                ...prevState,
                [name]: true,
              }));
            }
          }}
        >
          {children}
        </div>
        {show && (
          <Portal>
            <div
              className="absolute z-50 max-w-full"
              style={
                elementRect && {
                  top: `${elementRect?.top - 40 + window.scrollY}px`,
                  left: `${elementRect.left + window.scrollX}px`,
                  width: `${elementRect.width}px`,
                  // height minus position of the tooltip
                }
              }
            >
              <div className="flex h-8 w-auto items-center justify-center">
                <FadeInFadeOut
                  isOpen={clicked}
                  falseChild={
                    <div className="mb-1 flex w-auto flex-col" role="tooltip">
                      <div className="shadow-top-sm z-50 w-[150px] max-w-full rounded bg-[#40434f] p-1.5">
                        <p className="relative text-center text-white">
                          {text}
                        </p>
                      </div>
                      <div className="z-40 m-auto -mt-1.5 h-3 w-3 rotate-45 bg-[#40434f]" />
                    </div>
                  }
                  trueChild={
                    <div className="mb-1 flex w-auto flex-col" role="tooltip">
                      <div className="shadow-top-sm z-50 w-[150px] max-w-full rounded bg-[#40434f] p-1.5">
                        <p className="relative text-center text-white">
                          {clickedText}
                        </p>
                      </div>
                      <div className="z-40 m-auto -mt-1.5 h-3 w-3 rotate-45 bg-[#40434f]" />
                    </div>
                  }
                />
              </div>
            </div>
          </Portal>
        )}
      </React.Fragment>
    );
  }
);
export default Tooltip;
