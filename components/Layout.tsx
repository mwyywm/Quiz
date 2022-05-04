import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC = ({ children }: Props) => (
  <div>
    <Header />
    <div className="max-w-full w-[1200px] mx-auto px-2 mt-28">{children}</div>
  </div>
);

export default Layout;
