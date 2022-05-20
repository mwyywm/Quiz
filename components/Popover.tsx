import React, { useEffect, useState } from "react";

interface PopoverProps {
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

const Popover = ({ children, element }: PopoverProps) => {
  const [elementRect, setElementRect] = useState<ElementRectTypes | undefined>(
    undefined
  ); // elementRect is a DOMRect
  useEffect(() => {
    setElementRect(element.current.getBoundingClientRect());
    console.log(elementRect);
  }, [element]);
  if (!elementRect) return null;
  return (
    <div
      className={`absolute rounded-lg border border-gray-300 bg-white text-center shadow-lg`}
      style={{
        top: element.current && elementRect?.top - 30,
        left: elementRect?.left,
        width: elementRect?.width,
      }}
    >
      {children}
    </div>
  );
};
export default Popover;
