import React, { forwardRef, useEffect, useState } from "react";
import Portal from "./Portal";

interface TooltipProps {
  children: React.ReactNode;
  element?: any;
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
  ({ children }: TooltipProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [elementRect, setElementRect] = useState<
      ElementRectTypes | undefined
    >(undefined); // elementRect is a DOMRect
    const [show, setShow] = useState(false);
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
    return (
      <React.Fragment>
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="m-auto w-80"
        >
          {children}
        </div>
        {show && (
          <Portal>
            <div
              className={`absolute z-10 max-w-full cursor-none rounded-lg border border-gray-300 bg-white text-center shadow-lg `}
              style={
                elementRect && {
                  top: `${elementRect?.top - 30 + window.scrollY}px`,
                  left: `${elementRect.left + window.scrollX}px`,
                  width: elementRect.width,
                }
              }
            >
              <p className="text-m text-gray-800">Copy to clipboard</p>
            </div>
          </Portal>
        )}
      </React.Fragment>
    );
  }
);
export default Tooltip;
