import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <section className="mx-auto mt-24 w-[1200px] max-w-full px-2">
      {children}
    </section>
  </>
);

export default Layout;
