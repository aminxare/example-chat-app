import React from "react";

export const metadata = {
    title: "Auth",
    description: "Authentication",
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;
