import React, { forwardRef, useEffect, useState } from "react";
import { CopiedObjTypes } from "./QuizCreated";
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
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [elementRect, setElementRect] = useState<
      ElementRectTypes | undefined
    >(undefined); // elementRect is a DOMRect
    const [show, setShow] = useState(false);
    const [clicked, setClicked] = useState(false);
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
    const name =
      ref && "current" in ref && ref.current?.getAttribute("data-name");
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
              className={`absolute z-10 max-w-full rounded-lg border border-gray-300 bg-white text-center shadow-lg `}
              role="tooltip"
              style={
                elementRect && {
                  top: `${elementRect?.top - 30 + window.scrollY}px`,
                  left: `${elementRect.left + window.scrollX}px`,
                  width: elementRect.width,
                }
              }
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <p className="text-m text-gray-800">
                {clicked && clickedText ? clickedText : text}
              </p>
            </div>
          </Portal>
        )}
      </React.Fragment>
    );
  }
);
export default Tooltip;
