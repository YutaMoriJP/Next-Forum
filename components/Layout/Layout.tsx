import { useEffect, useState } from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
  CreateThread: React.ReactNode;
}

const Layout = ({ children, CreateThread }: LayoutProps): JSX.Element => {
  return (
    <>
      <Nav CreateThread={CreateThread} />
      {children}
    </>
  );
};

export default Layout;
