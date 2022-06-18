import React, { forwardRef, useEffect, useState } from "react";
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
    ref: React.ForwardedRef<any>
  ) => {
    const [elementRect, setElementRect] = useState<
      ElementRectTypes | undefined
    >(undefined); // elementRect is a DOMRect
    const [show, setShow] = useState(false);
    const [clicked, setClicked] = useState(false);

    const name =
      ref && "current" in ref && ref.current?.getAttribute("data-name");

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        setElementRect(ref.current.getBoundingClientRect());
      }
    }, [ref]);

    // on windows resize we need to recalculate the elementRect
    useEffect(() => {
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
          className="m-auto w-80 max-w-full"
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
                }
              }
            >
              <div className="flex h-8 w-auto items-center justify-center">
                <FadeInFadeOut
                  isOpen={clicked}
                  falseChild={
                    <div className="mb-1 flex w-auto flex-col" role="tooltip">
                      <div className="shadow-top-sm z-50 min-w-[150px] rounded bg-white p-1.5">
                        <p className="relative text-center text-black">
                          {text}
                        </p>
                      </div>
                      <div className="z-40 m-auto -mt-1.5 h-3 w-3 rotate-45 bg-white" />
                    </div>
                  }
                  trueChild={
                    <div className="mb-1 flex w-auto flex-col" role="tooltip">
                      <div className="shadow-top-sm z-50 min-w-[150px] rounded bg-white p-1.5">
                        <p className="relative text-center text-black">
                          {clickedText}
                        </p>
                      </div>
                      <div className="z-40 m-auto -mt-1.5 h-3 w-3 rotate-45 bg-white" />
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
