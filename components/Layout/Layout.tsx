import { useEffect, useState } from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
