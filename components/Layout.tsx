import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC = ({ children }: Props) => (
  <div>
    <Header />
    <div className="layout">{children}</div>
  </div>
);

export default Layout;
