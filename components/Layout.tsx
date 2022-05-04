import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div className="mx-auto mt-28 w-[1200px] max-w-full px-2">{children}</div>
  </>
);

export default Layout;
