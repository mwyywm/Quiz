import React, { useEffect, useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  element: any;
}

interface ElementRectTypes {
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

const Tooltip = ({ children, element }: TooltipProps) => {
  const [elementRect, setElementRect] = useState<ElementRectTypes | undefined>(
    undefined
  ); // elementRect is a DOMRect
  useEffect(() => {
    setElementRect(element.current.getBoundingClientRect());
  }, [element]);
  // on windows resize we need to recalculate the elementRect
  useEffect(() => {
    window.addEventListener("resize", () => {
      setElementRect(element.current?.getBoundingClientRect());
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [element]);
  console.log(elementRect);
  if (!elementRect) return null;
  return (
    <div
      className={`absolute z-10 max-w-full rounded-lg border border-gray-300 bg-white text-center shadow-lg`}
      style={{
        top: `${elementRect.top - 30 + window.scrollY}px`,
        left: `${elementRect?.left + window.scrollX}px`,
        width: elementRect?.width,
      }}
    >
      {children}
    </div>
  );
};
export default Tooltip;
